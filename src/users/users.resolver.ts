import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './models/users.model';
import { UsersService } from './users.service';
import { GetUserArgs } from './dto/args/get_user.arg';
import { CreateUserInput } from './dto/inputs/create_user.arg';
import { DeleteUserInput } from './dto/inputs/delete_user.input';
import { UpdateUserInput } from './dto/inputs/update_user.arg';
import { GetUsersArgs } from './dto/args/get_users.arg';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { nullable: 'items', name: 'getUsers' })
  getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
    return this.usersService.getUsers(getUsersArgs);
  }

  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User, { nullable: false, name: 'updateUser' })
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): User {
    return this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
    return this.usersService.deleteUser(deleteUserData);
  }

  @Query(() => [User], { nullable: true, name: 'getUser' })
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.usersService.getUser(getUserArgs);
  }
}
