import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { StudentService } from '../service/student.service';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  findAll() {
    return 'Todos los estudiantes';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return 'Un estudiante';
  }

  @Post()
  create(@Body() payload: any) {
    return 'Estudiante creado';
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return 'Estudiante Actualizado';
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return 'Estudiante eliminado';
  }
}
