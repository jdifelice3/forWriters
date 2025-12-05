"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.rejectConnectRequest = exports.approveConnectRequest = exports.createMemberConnectRequest = exports.createUser = exports.getAdminRequests = exports.getUserSearch = exports.getUserProfile = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const domain_types_1 = require("../domain-types");
const prisma = new client_1.PrismaClient();
//#region GET
const getUsers = async () => {
    const prisma2 = new client_1.PrismaClient();
    const users = await prisma2.user.findMany();
    return users;
};
exports.getUsers = getUsers;
const getUserProfile = async (authId) => {
    console.log('in getUserPfrofile');
    const user = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
        include: {
            userProfile: true,
        }
    });
    console.log('user', user);
    return user;
};
exports.getUserProfile = getUserProfile;
const getUserSearch = async (authId, query) => {
    const user = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
    });
    const users = await prisma.userSearch.findMany({
        where: {
            fullName: {
                contains: query,
                mode: "insensitive",
            },
            id: {
                not: user.id
            }
        },
        take: 10,
        orderBy: { fullName: "asc" },
        select: {
            id: true,
            fullName: true,
            bio: true
        },
    });
    return users;
};
exports.getUserSearch = getUserSearch;
const getAdminRequests = async (authId) => {
    const user = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
    });
    console.log('in user getAdminRequests');
    console.log('user.id', user.id);
    const requests = await prisma.collaboratorRequest.findMany({
        where: {
            collaboratorId: user.id,
            status: domain_types_1.JoinRequestStatus.PENDING,
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
    console.log('requests', requests);
    return requests;
};
exports.getAdminRequests = getAdminRequests;
//#endregion
//#region CREATE
const createUser = async (superTokensId, email, role) => {
    const newUser = await prisma.user.create({
        data: {
            email: email,
            superTokensId: superTokensId,
            role: role,
            username: email,
            userProfile: {
                create: {}
            }
        }
    });
    return newUser;
};
exports.createUser = createUser;
const createMemberConnectRequest = async (authId, collaboratorId) => {
    const user = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
    });
    //Check if User exists  
    const member = await prisma.user.findUnique({
        where: { id: collaboratorId },
    });
    if (!user) {
        const joinGroupError = new domain_types_1.JoinRequestError("User not found.", 404);
        throw joinGroupError;
    }
    // Check if you already connected to the member
    const existingConnection = await prisma.userCollaborator.findMany({
        where: {
            userId: user.id,
            collaboratorId: collaboratorId
        }
    });
    console.log('existingConnection', existingConnection);
    if (existingConnection.length > 0) {
        const joinGroupError = new domain_types_1.JoinRequestError("You have already connected to this member.", 400);
        throw joinGroupError;
    }
    // Check if there's already a pending request
    const existingRequest = await prisma.collaboratorRequest.findFirst({
        where: {
            userId: user.id,
            collaboratorId: collaboratorId,
            status: domain_types_1.JoinRequestStatus.PENDING,
        },
    });
    if (existingRequest) {
        const joinGroupError = new domain_types_1.JoinRequestError("You already have a pending request with this member.", 400);
        throw joinGroupError;
    }
    // Create new member connect request
    const connectRequest = await prisma.collaboratorRequest.create({
        data: {
            userId: user.id,
            collaboratorId: collaboratorId,
            status: domain_types_1.JoinRequestStatus.PENDING,
        },
        include: {
            user: {
                include: {
                    userProfile: true
                }
            }
        }
    });
    return connectRequest;
};
exports.createMemberConnectRequest = createMemberConnectRequest;
const approveConnectRequest = async (connectRequestId, authId) => {
    const user = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
    });
    const connectReq = await prisma.collaboratorRequest.findUnique({
        where: {
            id: connectRequestId
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
        throw new domain_types_1.JoinRequestError("Join request not found.", 404);
    }
    if (connectReq.status !== domain_types_1.JoinRequestStatus.PENDING) {
        throw new domain_types_1.JoinRequestError("This request is no longer pending.", 400);
    }
    // Approve + add membership in a transaction
    await prisma.collaboratorRequest.update({
        where: { id: connectReq.id },
        data: { status: domain_types_1.JoinRequestStatus.APPROVED },
    });
    await prisma.userCollaborator.create({
        data: {
            userId: connectReq.userId,
            collaboratorId: connectReq.collaboratorId
        }
    });
    //   await prisma.$transaction([
    //     prisma.collaboratorRequest.update({
    //       where: { id: connectReq.id },
    //       data: { status: JoinRequestStatus.APPROVED },
    //     }),
    //     prisma.userCollaborator.upsert({
    //       where: {
    //           userId: connectReq.userId,
    //           collaboratorId: connectReq.collaboratorId,
    //       },
    //       create: {
    //         userId: connectReq.userId,
    //         collaboratorId: connectReq.collaboratorId,
    //       },
    //       update: {}, 
    //     }),
    //   ]);
    return true;
};
exports.approveConnectRequest = approveConnectRequest;
const rejectConnectRequest = async (connectRequestId, authId) => {
    // Load the request
    const user = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
    });
    const connectReq = await prisma.collaboratorRequest.findUnique({
        where: { id: connectRequestId },
    });
    if (!connectReq) {
        throw new domain_types_1.JoinRequestError("Connect request not found.", 404);
    }
    if (connectReq.status !== domain_types_1.JoinRequestStatus.PENDING) {
        throw new domain_types_1.JoinRequestError("This request is no longer pending.", 400);
    }
    await prisma.collaboratorRequest.update({
        where: { id: connectRequestId },
        data: { status: domain_types_1.JoinRequestStatus.REJECTED },
    });
};
exports.rejectConnectRequest = rejectConnectRequest;
//#endregion
//#region UPDATE
const updateUserProfile = async (userId, firstName, lastName, bio) => {
    try {
        const updatedUser = await prisma.userProfile.update({
            where: {
                id: userId
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                bio: bio
            }
        });
        console.log('updatedUser', updatedUser);
        return updatedUser;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        throw (err);
    }
};
exports.updateUserProfile = updateUserProfile;
//#endregion
