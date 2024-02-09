class UserController {
  async registration(req, res) {}
  async login(req, res) {}
  async check(req, res) {
    res.json("test1");
  }
  async update(req, res) {}
}
export const Controller = new UserController();
