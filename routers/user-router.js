const router = require('express').Router();

const UserController = require("../controllers/UserController");

router.get("/:id", UserController.showUserLogin)
router.get("/:id/profile", UserController.showUserProfile)
router.get("/:id/profile/edit", UserController.editProfileForm)
router.post("/:id/profile/edit", UserController.editProfile)
router.get("/:id/profile/delete", UserController.deleteProfileAccount)
router.get("/:id/book-ticket", UserController.bookTicketForm)
router.post("/:id/book-ticket", UserController.bookTicket)
router.get("/:id/my-ticket", UserController.showMyTicket)
router.get("/:id/my-ticket/eticket/:emailid", UserController.eticket)

module.exports = router;