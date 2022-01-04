import { OperationType } from "../../entities/Statement";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;

describe("Create statement", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository,
    );
  });

  it("should be able to create a new deposit statement", async () => {
    const user = await createUserUseCase.execute({
      name: "UserTest",
      email: "user_test@test.com.br",
      password: "user_test_password"
    });

    const deposit = await createStatementUseCase.execute({
      user_id: user.id as string,
      description: "deposit test",
      amount: 90,
      type: OperationType.DEPOSIT
    });

    expect(deposit).toHaveProperty("id");
  });

  it("should be able to create a new withdraw statement", async () => {
    const user = await createUserUseCase.execute({
      name: "UserTest2",
      email: "user_test2@test.com.br",
      password: "user2_test_password"
    });

    const deposit = await createStatementUseCase.execute({
      user_id: user.id as string,
      description: "deposit test",
      amount: 90,
      type: OperationType.DEPOSIT
    });

    const withdraw = await createStatementUseCase.execute({
      user_id: user.id as string,
      description: "withdraw test",
      amount: 20,
      type: OperationType.WITHDRAW
    });

    expect(withdraw).toHaveProperty("id");
  });
});

