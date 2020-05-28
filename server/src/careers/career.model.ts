import * as mongoose from 'mongoose';
import Career from './career.interface';

const careerSchema = new mongoose.Schema ({
  title: String,
  description: String,
  prerequisite: String,
  //author: String,
});

const careerModel = mongoose.model<Career & mongoose.Document>('Career', careerSchema);

export default careerModel;
