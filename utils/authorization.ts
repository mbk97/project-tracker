import userModel from "../model/userModel";

const checkUserAuthorization = async (req: any, projectData: any) => {
  const user = await userModel.findById(req.user.id);

  if (!user || projectData?.user.toString() !== user.id) {
    return false; // User is not authorized
  }

  return true; // User is authorized
};

export { checkUserAuthorization };
