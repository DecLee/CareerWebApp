import * as mongoose from 'mongoose';
import Career from './career.interface';

const careerSchema = new mongoose.Schema ({
  title: String,
  description: String,
  prerequisite: String,
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  }
});

const careerModel = mongoose.model<Career & mongoose.Document>('Career', careerSchema);

export default careerModel;
