import { Router } from "express";
import { AuthMiddleware } from "./middleware/AuthMiddleware";
import { userController } from "./useCase/User";
import { carController } from "./useCase/Car";
import upload from './config/Multer'
import { rentCarController } from "./useCase/RentCar";

const router = Router()

// -- CAR ROUTES -- //
router.post('/cars', (req, res) => {
  return carController.handle(req, res)
})

router.post('/cars/:id/image', upload.single('file'), (req, res) => {
  return carController.addImageToCar(req, res)
})

router.get('/cars', (req, res) => {
  return carController.getCars(req, res)
})

router.get('/cars/:id', (req, res) => {
  return carController.getCarById(req, res)
})

router.delete('/cars/:id', (req, res) => {
  return carController.deleteCar(req, res)
})

// -- RENT ROUTES -- //
router.post('/car/rentals', AuthMiddleware, (req, res, next) => {
  return rentCarController.handle(req, res)
})

router.get('/car/rentals/:id', (req, res) => {
  return rentCarController.getRentedCar(req, res)
})

router.get('/car/rentals', (req, res) => {
  return rentCarController.getRentedCars(req, res)
})

// -- USER ROUTES -- //

router.post('/signup', (req, res) => {
  return userController.handle(req, res)
})

router.post('/signin', (req, res) => {
  return userController.authenticate(req, res)
})

router.get('/users', (req, res) => {
  return userController.getUsers(req, res)
})

router.get('/users/:id', (req, res) => {
  return userController.getUserById(req, res)
})

router.get('/perfil', AuthMiddleware, (req, res, next) => {
  return userController.getPerfil(req, res)
})

export default router