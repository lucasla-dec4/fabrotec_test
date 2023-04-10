import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async handleAddMulti(body: any) {
    const { type, cmd_chain } = body;

    const queryRunner = this.userRepository;
    let dbState = [];
    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    try {
      for (const cmd of cmd_chain) {
        const { type, cmd: sql } = cmd;

        // Execute the SQL command with parameters to prevent SQL injection
        const result = await queryRunner.query(sql, []);

        // Update the current database state with the result of the executed command
        dbState = [...dbState, ...result];

        // Throw an error if the SQL command returns an error
        if (result[0]?.error) {
          throw new HttpException(result[0]?.error, HttpStatus.BAD_REQUEST);
        }
      }

      // If all SQL commands were executed successfully, commit the transactio

      // Return the current state of the database and a 200 OK response
      return { status: 'ok', dbState };
    } catch (err) {
      console.log(err);
      return { status: 'error', err };
    }
  }
}
