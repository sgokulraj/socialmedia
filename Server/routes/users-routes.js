import express from "express"
import {getUser,getUserFriends,addRemoveFriend, updateUser, deleteUser} from "../controllers/users-controller.js"
import {verifyToken} from "../middleware/auth-middleware.js"

const router = express.Router()

//Read
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)

//Update
router.patch("/:id/:friendId", verifyToken,addRemoveFriend)
router.patch("/:id/:firstName/:lastName/:occupation/:location/:email", updateUser)

//delete
router.delete("/:id", verifyToken, deleteUser)
export default router