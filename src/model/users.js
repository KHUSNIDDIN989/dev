
export class User {
  constructor(
    user_id,
    user_name,
    user_email,
    user_password,
    profile_img,
    is_deleted
  ) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.user_email = user_email;
    this.user_password = user_password;
    this.profile_img = profile_img;
    this.is_deleted = is_deleted;
  }
}

