import { userSchema } from "@/schemas/userSchema";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  try {
    const userObj = await userSchema.validate(req.body, { abortEarly: false });

    const user = await prisma.user.findUnique({
      where: {
        email: userObj.email,
      },
    });

    if (user) {
      return res.status(400).json({ errorMessages: [...errorMessages, { type: "server", message: "email" }] });
    } else {
      userObj.password = await hash(userObj.password, 12);

      const createUser = await prisma.user.create({
        data: { name: userObj.name, email: userObj.email, password: userObj.password },
      });

      return res.status(201).send();
    }
  } catch (e) {
    const errorMessages = e.inner.reduce((acc, curr) => {
      return [...acc, { name: curr.path, message: curr.errors[0], type: "field" }];
    }, []);

    return res.status(400).json({ errorMessages: [...errorMessages, { type: "server", message: "email" }] });
  }
}
