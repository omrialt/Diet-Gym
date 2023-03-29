import Menu, { validateMenu } from "../models/MenuModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//action-get menus
//method-GET
//route-/api/menu
//access-any
const getAllMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.find();
  if (menus) {
    res.json(menus);
  }
  if (!menus) {
    return res.status(404).json({ message: "Menus not found" });
  }
});

//action-get menu by id
//method-GET
//route-/api/menu/:id
//access-any
const getMenuById = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  if (menu) {
    res.json(menu);
  }
  if (!menu) {
    return res.status(404).json({ message: "Menu not found" });
  }
});

const getMenusByUser = asyncHandler(async (userId) => {
  const menus = await Menu.find({ user: userId });
  if (menus) {
    return menus;
  }
  return [];
});

//action-delete menu by id
//method-DELETE
//route-/api/menu/:id
//access-protect
const deleteMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (menu && menu.user === userId.toString()) {
    await menu.remove();
    user.totalUploads--;
    await user.save();
    res.json({ message: "Menu remove" });
  } else {
    return res.status(404).json({ message: "Error occourd" });
  }
});
//action-create new menu
//method-POST
//route-/api/menu
//access-protect
const createMenu = asyncHandler(async (req, res) => {
  const menu = new Menu(req.body);
  const user = await User.findById(req.body.user);
  const { error } = validateMenu(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  user.totalUploads++;
  await user.save();
  const createdMenu = await menu.save();
  res.status(201).json(createdMenu);
});

//action-update menu by id
//method-PUT
//route-/api/menu/:id
//access-protect
const updateMenu = asyncHandler(async (req, res) => {
  const body = req.body;
  delete body._id;
  const { error } = validateMenu(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const {
    title,
    type,
    description,
    foods,
    image,
    totalCalories,
    totalCarbohydrate,
    totalFats,
    totalProtein,
  } = req.body;
  const userId = req.user._id;
  const menu = await Menu.findById(req.params.id);
  if (menu && menu.user.toString() === userId.toString()) {
    menu.title = title;
    menu.type = type;
    menu.description = description;
    menu.foods = foods;
    menu.image = image;
    (menu.totalCalories = totalCalories),
      (menu.totalCarbohydrate = totalCarbohydrate),
      (menu.totalFats = totalFats),
      (menu.totalProtein = totalProtein);

    const updatedMenu = await menu.save();
    res.status(201).json(updatedMenu);
  } else {
    return res.status(404).json({ message: "Menu not found" });
  }
});
//action-add new review
//method-POST
//route-/api/menu/:id/reviews
//access-protect
const createMenuReview = asyncHandler(async (req, res) => {
  const { error } = validateReview({
    name: req.user.fullname,
    rating: req.body.rating,
    comment: req.body.comment,
  });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { rating, comment } = req.body;
  const menu = await Menu.findById(req.params.id);
  if (menu) {
    const review = {
      name: req.user.fullname,
      rating: +rating,
      comment,
      user: req.user._id,
    };
    menu.reviews.push(review);
    menu.rating =
      menu.reviews.reduce((acc, item) => item.rating + acc, 0) /
      menu.reviews.length;
    await menu.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    return res.status(400).json({ message: "Menu not found" });
  }
});
//action-get menu by type
//method-GET
//route-/api/menu/types/:type
//access-any
const getMenuByType = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const menus = await Menu.find({ type });

  if (menus) {
    res.json(menus);
  }
  if (!menus) {
    return res.status(404).json({ message: "Menus not found" });
  }
});
//action-toggle like on menu
//method-POST
//route-/api/menu/:id/likes
//access-protect
const toggleMenuLike = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  if (menu) {
    const { likesByUser } = menu;
    const alreadyLiked = likesByUser.find(
      (like) => like.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      const idx = likesByUser.findIndex((like) => like === req.user._id);
      likesByUser.splice(idx, 1);
      menu.likesByUser = likesByUser;
      menu.likesCount -= 1;
      await menu.save();
    } else {
      likesByUser.push(req.user._id);
      menu.likesCount += 1;
      await menu.save();
    }
    res.status(201).json(menu);
  } else {
    return res.status(404).json({ message: "Menu not found" });
  }
});

export {
  getAllMenus,
  getMenuById,
  deleteMenu,
  createMenu,
  updateMenu,
  createMenuReview,
  getMenuByType,
  toggleMenuLike,
  getMenusByUser,
};
