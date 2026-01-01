import { Router, Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";
import Session from "supertokens-node/recipe/session";
import { JoinRequestError } from "../../database/types/Error";
import { JoinRequestStatus } from "@prisma/client";

const router = Router();

router.post("/:userId/connect-requests", async(req, res) => {
    const { userId  } = req.params; //formerly collaboratorId, the person the current user wants to connect to
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    
    const user: any = await prisma.user.findUnique({
      where: {
        superTokensId: authId,
      },
    });

  //Check if User exists  
  const member = await prisma.user.findUnique({
      where: { id: userId },
  });

  if (!user) {
    const joinGroupError = new JoinRequestError("User not found.", 404);
    throw joinGroupError;
  }

  // Check if you already connected to the member
  const existingConnection = await prisma.userCollaborator.findMany({
    where: { 
        userId: user.id,
        collaboratorId: userId
    }
  });
  
  if (existingConnection.length > 0) {
    const joinGroupError = new JoinRequestError("You have already connected to this member.", 403);
    throw joinGroupError;
  }

  // Check if there's already a pending request
  const existingRequest = await prisma.collaboratorRequest.findFirst({
    where: {
      userId: user.id,
      collaboratorId: userId,
      status: JoinRequestStatus.PENDING,
    },
  });
  if (existingRequest) {
    const joinGroupError = new JoinRequestError("You already have a pending request with this member.", 403);
    throw joinGroupError;
  }

  // Create new member connect request
  const connectRequest = await prisma.collaboratorRequest.create({
    data: {
      userId: user.id,
      collaboratorId: userId,
      status: JoinRequestStatus.PENDING,
    },
    include: {
      user: {
        include: {
            userProfile: true
        }
      }
    }
  });

  res.status(200).json(connectRequest);
});

router.get("/connect-requests", async(req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    
    const user: any = await prisma.user.findUnique({
          where: {
            superTokensId: authId,
          },
        });  
      
    const requests = await prisma.collaboratorRequest.findMany({
        where: {
            collaboratorId: user.id,
            status: JoinRequestStatus.PENDING,
        },
        orderBy: { createdAt: "asc" },
        include: {
            user: {
                include: {
                    userProfile: true
                }
            },
        },
    });
      
    res.status(200).json(requests);
});

router.put("/connect-requests/:id/approve", async(req, res, next) => {
    const { id } = req.params;

    try {
      const session = await Session.getSession(req, res);
      const authId = session.getUserId(true);
      
      const user = await prisma.user.findUnique({
            where: {
            superTokensId: authId,
            },
        });
            
        const connectReq: any = await prisma.collaboratorRequest.findUnique({
            where: { 
                id: id 
            },
            include: {
                user: {
                    include: {
                        userProfile: true
                    }
                }
            }
        });
        
        if (!connectReq) {
            throw new JoinRequestError("Join request not found.", 404);
        }
    
        if (connectReq.status !== JoinRequestStatus.PENDING) {
            throw new JoinRequestError("This request is no longer pending.", 400);
        }
    
        // Approve + add membership in a transaction
    
        await prisma.collaboratorRequest.update({
            where: { id: connectReq.id },
            data: { status: JoinRequestStatus.APPROVED },
            });
    
        await prisma.userCollaborator.create({
            data: {
                userId: connectReq.userId,
                collaboratorId: connectReq.collaboratorId
            }
        });
      
        res.status(200).json({
            message: "Member connect request had been approved.",
        });

    } catch (err) {
      if(err instanceof JoinRequestError){
        res.status(err.statusCode).json({error: err.message});
      } else {
        next(err);
      }
    }
});

router.put("/connect-requests/:id/reject", async(req, res, next) => {
    const { id } = req.params;

    try {
        const session = await Session.getSession(req, res);
        const authId = session.getUserId(true);
      
        const user: any = await prisma.user.findUnique({
            where: {
                superTokensId: authId,
            },
        });
            
        const connectReq = await prisma.collaboratorRequest.findUnique({
            where: { id: id },
        });

        if (!connectReq) {
            throw new JoinRequestError("Connect request not found.", 404);
        }

        if (connectReq.status !== JoinRequestStatus.PENDING) {
            throw new JoinRequestError("This request is no longer pending.", 403);
        }

        await prisma.collaboratorRequest.update({
            where: { id: id },
            data: { status: JoinRequestStatus.REJECTED },
        });

        res.status(200).json({
            message: "Member connect request has been rejected.",
        });
    } catch (err) {
        if(err instanceof JoinRequestError){
            res.status(err.statusCode).json({error: err.message});
        } else {
            next(err);
        }
    }
});
