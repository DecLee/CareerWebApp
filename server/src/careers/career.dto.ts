import { IsString } from 'class-validator';

class CreateCareerDto {
  @IsString()
  public title: string;

  public description: string;

  public author: string;

  public prerequisite: string;
}

export default CreateCareerDto;
