"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroup = exports.rejectJoinRequest = exports.approveJoinRequest = exports.createJoinGroupRequest = exports.createGroup = exports.getAdminRequests = exports.getGroupSearch = exports.getGroupByUserId = exports.getGroupDescription = exports.getGroupUsers = exports.getGroup = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const Error_1 = require("../types/Error");
const prisma = new client_1.PrismaClient();
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, "Street is required"),
    city: zod_1.z.string().min(1, "City is required"),
    state: zod_1.z.string().min(2, "State is required").max(2, "Use 2-letter code"),
    zip: zod_1.z.string().min(5, "ZIP is required").max(10, "Invalid ZIP"),
});
//#region GET
const getGroup = async (groupId) => {
    const currentDate = new Date();
    try {
        const group = await prisma.group.findUnique({
            where: {
                id: groupId,
            },
            include: {
                groupAddress: true,
                groupUrl: true,
                groupUser: true,
                reading: {
                    where: {
                        submissionDeadline: {
                            lte: currentDate
                        },
                        readingDate: {
                            gt: currentDate
                        }
                    },
                    orderBy: {
                        submissionDeadline: 'asc',
                    },
                },
            },
        });
        return group;
    }
    catch (err) {
        console.error('Error creating group:', err);
        throw err;
    }
};
exports.getGroup = getGroup;
const getGroupUsers = async (groupId) => {
    const groupUsers = prisma.groupUser.findMany({
        where: {
            groupId: groupId
        },
        include: {
            user: {
                include: {
                    userProfile: true
                },
                omit: {
                    id: true,
                    superTokensId: true,
                    email: true,
                    role: true,
                    username: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        },
        omit: {
            id: true,
            userId: true,
            groupId: true,
            isAdmin: true,
            invitedBy: true,
            createdAt: true,
        },
    });
    return groupUsers;
};
exports.getGroupUsers = getGroupUsers;
const getGroupDescription = async (groupId) => {
    const currentDate = new Date();
    try {
        const group = await prisma.group.findUnique({
            where: {
                id: groupId,
            },
            select: {
                description: true,
                websiteUrl: true,
                groupAddress: true,
            },
        });
        if (group) {
            return group;
        }
        else {
            throw new Error("Group not found");
        }
    }
    catch (err) {
        console.error('Error creating group:', err);
        throw err;
    }
};
exports.getGroupDescription = getGroupDescription;
const getGroupByUserId = async (userId) => {
    try {
        const groupsByUserId = await prisma.groupUser.findMany({
            where: {
                userId: userId
            }
        });
        let groupIdArray = [];
        for (let i = 0; i < groupsByUserId.length; i++) {
            groupIdArray.push(groupsByUserId[i].groupId);
        }
        if (!groupsByUserId) {
            throw new Error_1.GroupError('User has not joined any groups', 404);
        }
        const groups = await prisma.group.findMany({
            where: {
                id: {
                    in: groupIdArray
                }
            },
            include: {
                reading: true,
                groupAddress: true,
                groupUrl: true,
                groupUser: {
                    where: {
                        userId: userId
                    }
                },
            },
        });
        return groups;
    }
    catch (err) {
        console.error('Error creating group:', err);
        throw err;
    }
};
exports.getGroupByUserId = getGroupByUserId;
const getGroupSearch = async (query) => {
    const groups = await prisma.group.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive",
            },
        },
        take: 10,
        orderBy: { name: "asc" },
        select: {
            id: true,
            name: true,
            // add any other fields you want to show
        },
    });
    return groups;
};
exports.getGroupSearch = getGroupSearch;
const getAdminRequests = async (authId) => {
    const user = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
    });
    // Find groups where this user is an ADMIN
    const adminMemberships = await prisma.groupUser.findMany({
        where: {
            userId: user.id,
            isAdmin: true,
        },
        select: { groupId: true },
    });
    const groupIds = adminMemberships.map((m) => m.groupId);
    if (groupIds.length === 0) {
        return null; // no admin groups -> no requests
    }
    const requests = await prisma.joinRequest.findMany({
        where: {
            groupId: { in: groupIds },
            status: client_1.JoinRequestStatus.PENDING,
        },
        orderBy: { createdAt: "asc" },
        include: {
            user: true,
            group: true,
        },
    });
    return requests;
};
exports.getAdminRequests = getAdminRequests;
//#endregion
//#region CREATE
const createGroup = async (authId, name, address, description, groupType, imgUrl, websiteUrl) => {
    try {
        // Get userId from authId
        const user = await prisma.user.findUnique({
            where: {
                superTokensId: authId,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        const group = await prisma.group.create({
            data: {
                name: name,
                description: description,
                creatorUserId: user.id,
                imageUrl: (imgUrl !== undefined) ? imgUrl : "",
                groupType: groupType,
                groupAddress: {
                    create: {
                        street: address.street,
                        city: address.city,
                        state: address.state,
                        zip: address.zip,
                    }
                },
                groupUser: {
                    create: {
                        userId: user.id,
                        isAdmin: true,
                    }
                }
            },
            include: {
                groupUser: true, // REQUIRED
                groupAddress: true, // REQUIRED if you include it in the type
            },
        });
        if (group) {
            return group;
        }
        else {
            throw new Error("Create group failed.");
        }
    }
    catch (error) {
        console.error('Error creating group:', error);
        throw error;
    }
};
exports.createGroup = createGroup;
const createJoinGroupRequest = async (authId, groupId) => {
    const user = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
    });
    //Check if Group exists  
    const group = await prisma.group.findUnique({
        where: { id: groupId },
    });
    if (!group) {
        const joinGroupError = new Error_1.JoinRequestError("Group not found.", 404);
        throw joinGroupError;
    }
    // Check if user already a member
    const existingMember = await prisma.groupUser.findUnique({
        where: {
            groupId_userId: {
                userId: user.id,
                groupId: groupId
            }
        }
    });
    if (existingMember) {
        const joinGroupError = new Error_1.JoinRequestError("You are already a member of this group.", 400);
        throw joinGroupError;
    }
    // Check if there's already a pending request
    const existingRequest = await prisma.joinRequest.findFirst({
        where: {
            userId: user.id,
            groupId,
            status: client_1.JoinRequestStatus.PENDING,
        },
    });
    if (existingRequest) {
        const joinGroupError = new Error_1.JoinRequestError("You already have a pending join request.", 400);
        throw joinGroupError;
    }
    // Create new join request
    const joinRequest = await prisma.joinRequest.create({
        data: {
            userId: user.id,
            groupId,
            status: client_1.JoinRequestStatus.PENDING,
        },
        include: {
            user: true,
            group: true
        }
    });
    return joinRequest;
};
exports.createJoinGroupRequest = createJoinGroupRequest;
const approveJoinRequest = async (joinRequestId, authId) => {
    const user = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
    });
    const joinReq = await prisma.joinRequest.findUnique({
        where: {
            id: joinRequestId
        },
        include: {
            group: true,
        },
    });
    if (!joinReq) {
        throw new Error_1.JoinRequestError("Join request not found.", 404);
    }
    if (joinReq.status !== client_1.JoinRequestStatus.PENDING) {
        throw new Error_1.JoinRequestError("This request is no longer pending.", 400);
    }
    // Verify current user is admin for this group
    const adminMembership = await prisma.groupUser.findUnique({
        where: {
            groupId_userId: {
                groupId: joinReq.group.id,
                userId: user.id,
            },
        },
    });
    if (!adminMembership || !adminMembership.isAdmin) {
        throw new Error_1.JoinRequestError("You are not an admin for this group.", 403);
    }
    // Approve + add membership in a transaction
    await prisma.$transaction([
        prisma.joinRequest.update({
            where: { id: joinReq.id },
            data: { status: client_1.JoinRequestStatus.APPROVED },
        }),
        prisma.groupUser.upsert({
            where: {
                groupId_userId: {
                    userId: joinReq.userId,
                    groupId: joinReq.groupId,
                }
            },
            create: {
                userId: joinReq.userId,
                groupId: joinReq.groupId,
                isAdmin: false,
            },
            update: {}, // membership already exists -> nothing to change
        }),
    ]);
    return true;
};
exports.approveJoinRequest = approveJoinRequest;
const rejectJoinRequest = async (joinRequestId, authId) => {
    // Load the request
    const user = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
    });
    const joinReq = await prisma.joinRequest.findUnique({
        where: { id: joinRequestId },
    });
    if (!joinReq) {
        throw new Error_1.JoinRequestError("Join request not found.", 404);
    }
    if (joinReq.status !== client_1.JoinRequestStatus.PENDING) {
        throw new Error_1.JoinRequestError("This request is no longer pending.", 400);
    }
    // Verify current user is admin for this group
    const adminMembership = await prisma.groupUser.findUnique({
        where: {
            groupId_userId: {
                userId: user.id,
                groupId: joinReq.groupId,
            },
        },
    });
    if (!adminMembership || !adminMembership.isAdmin) {
        throw new Error_1.JoinRequestError("You are not an admin for this group.", 403);
    }
    await prisma.joinRequest.update({
        where: { id: joinRequestId },
        data: { status: client_1.JoinRequestStatus.REJECTED },
    });
};
exports.rejectJoinRequest = rejectJoinRequest;
//#endregion
//#region UPDATE
const updateGroup = async (groupId, name, addressId, street, city, state, zip, description, imageUrl, websiteUrl) => {
    const group = await prisma.group.update({
        where: {
            id: groupId,
        },
        data: {
            name: name,
            description: description !== undefined ? description : "",
            imageUrl: imageUrl !== undefined ? imageUrl : "",
            websiteUrl: websiteUrl !== undefined ? websiteUrl : "",
            groupAddress: {
                update: {
                    where: {
                        id: addressId, // Specify the ID of the address to update
                    },
                    data: {
                        street: street,
                        city: city,
                        state: state,
                        zip: zip,
                    },
                },
            },
        },
    });
    return group;
};
exports.updateGroup = updateGroup;
//#endregion
