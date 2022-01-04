import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show User Profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository,
    );
  });

  it("shoud be able to show user profile", async () => {
    const user = await createUserUseCase.execute({
      name: "UserTest",
      email: "userTest@test.com.br",
      password: "userTestPassword"
    });

    const profile = await showUserProfileUseCase.execute(user.id as string);

    expect(profile.id).toEqual(user.id);
  });
});
