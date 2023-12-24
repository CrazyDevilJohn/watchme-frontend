import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
  feetchFeedsByCategoryQuery,
  fetchFeedById,
  fetchFeedBysearchQuery,
  fetchFeedsByFilterQuery,
  fetchFeedsQuery,
} from "./utils/supports";

const config = {
  projectId: "7x6vlg86",
  dataset: "production",
  apiVersion: "2023-11-15",
  //   useCdn: true,
  token:
    "skw2kOgHDfEMdMObyAWIZCxzPJrYMKUkNnQ7HH0CmufDIHqUtnN3f1oHkb5yWvznjSBNEQ3MxpWOsRQ0AvYgkejnYsH0LMnoGeC3pKRCHTi8lx3w85lUbXaUo6jYOExONgITBvqrycJMlODyCZYLqS2G8xqYQt0PgaKaPF3yFDvdkylCWTxr",
};

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const createUser = async (user) => {
  const _doc = {
    _id: user.uid,
    _type: "user",
    userName: user.displayName,
    image: user.photoURL,
  };
  await client.createIfNotExists(_doc).then((res) => {
    return res;
  });
};

export const feetchFeeds = async () => {
  const data = await client
    .fetch(fetchFeedsQuery)
    .catch((er) => console.log(er));
  return data;
};

export const feetchFeedById = async (id) => {
  const data = await client
    .fetch(fetchFeedById(id))
    .catch((er) => console.log(er));
  return data;
};

export const fetchFeedByCatagory = async (feed) => {
  const data = await client
    .fetch(feetchFeedsByCategoryQuery(feed))
    .catch((er) => console.log(er));
  return data;
};

export const fetchFeedByFilterCatagory = async (category) => {
  const data = await client
    .fetch(fetchFeedsByFilterQuery(category))
    .catch((er) => console.log(er));
  return data;
};

export const fetchFeedBySearch = async (string) => {
  const data = await client
    .fetch(fetchFeedBysearchQuery(string))
    .catch((er) => console.log(er));
  return data;
};

export const uploadAsset = async (asset) => {
  const data = await client.assets.upload("image", asset, {
    contentType: asset.type,
    filename: asset.name,
  });
  return data;
};
