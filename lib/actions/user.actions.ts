"use server";

import React from "react";
import { createSessionClient } from "../server/appwrite";

export const signIn = async () => {
  try {
  } catch (error) {
    console.error("Unable to sign in: ", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
  } catch (error) {
    console.error("Unable to sign in: ", error);
  }
};

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
};
