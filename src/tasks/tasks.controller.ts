import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import {
  Body,
  Controller,
  Param,
  Query,
  Get,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // [GET] http://localhost:3000/tasks
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // if we have any filter defined, call taskService.getTaskWithFilters
    // otherwise, just get all tasks

    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTask();
    }

    return this.tasksService.getAllTask();
  }

  // [GET] http://localhost:3000/tasks/123
  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // [POST] http://localhost:3000/tasks
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;

    return this.tasksService.updateTaskStatus(id, status);
  }
}
