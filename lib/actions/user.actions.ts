"use server";

import { createAdminClient, createSessionClient } from "../server/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const res = await account.createEmailPasswordSession(email, password);

    return parseStringify(res);
  } catch (error) {
    console.error("Unable to sign in: ", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Unable to sign in: ", error);
  }
};

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    if (!user) return null;

    return parseStringify(user);
  } catch (error) {
    console.error("Unable to get logged in user", error);
  }
};

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    return await account.deleteSession("current");
  } catch (error) {
    console.error("Unable to get logged in user", error);
    throw new Error("Unable to get logged in user", { cause: error });
  }
};
