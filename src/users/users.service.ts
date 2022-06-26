import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/args/get_user.arg';
import { CreateUserInput } from './dto/inputs/create_user.arg';
import { User } from './models/users.model';
import { UpdateUserInput } from './dto/inputs/update_user.arg';
import { DeleteUserInput } from './dto/inputs/delete_user.input';
import { GetUsersArgs } from './dto/args/get_users.arg';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.userids
      ? getUsersArgs.userids.map((userid) => this.getUser({ userid }))
      : this.users;
  }

  public createUser(createUserInput: CreateUserInput): User {
    const user: User = {
      userid: uuidv4(),
      ...createUserInput,
    };
    this.users.push(user);
    return user;
  }

  public updateUser(user: UpdateUserInput): User {
    const fetchUser = this.users.find((u) => u.userid === user.userid);
    if (fetchUser) {
      fetchUser.age = user.age ? user.age : fetchUser.age;
      fetchUser.isSubscribed = user.isSubscribed
        ? user.isSubscribed
        : fetchUser.isSubscribed;
    }
    return fetchUser;
  }

  public deleteUser(deleteUserInput: DeleteUserInput): User {
    const fetchUser = this.users.find(
      (u) => u.userid === deleteUserInput.userid,
    );
    if (fetchUser) {
      this.users = this.users.filter(
        (u) => u.userid !== deleteUserInput.userid,
      );
    }
    return fetchUser;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((u) => u.userid === getUserArgs.userid);
  }
}
