import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant";

const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOptions = (req.query.sortOptions as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    const query: any = {};
    query["city"] = new RegExp(city, "i");
    const matchingCities = await Restaurant.countDocuments(query);
    if (matchingCities === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          countMatchedRestaurant: 0,
          currentPage: 1,
          totalPages: 1,
        },
      });
    }

    // filter restaurants where all the cuisines match the selectedCuisines query parameter.
    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));
      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skipRecords = (page - 1) * pageSize;
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOptions]: 1 })
      .skip(skipRecords)
      .limit(pageSize)
      .lean();
    const totalRestaurants = await Restaurant.countDocuments(query);
    const totalPages = Math.ceil(totalRestaurants / pageSize);

    const response = {
      data: restaurants,
      pagination: {
        countMatchedRestaurant: totalRestaurants,
        currentPage: page,
        totalPages: totalPages,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export default { searchRestaurants };
