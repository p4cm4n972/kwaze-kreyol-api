import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMotDto } from './dto/create-mot.dto';
import { UpdateMotDto } from './dto/update-mot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mot, MotDocument } from './entities/mot.entity';
import { Model } from 'mongoose';

@Injectable()
export class MotService {
  constructor(
    @InjectModel(Mot.name) private readonly motModel: Model<MotDocument>,
  ) { }

  async create(createMotDto: CreateMotDto): Promise<Mot> {
    const created = new this.motModel(createMotDto);
    return created.save();
  }

  async findAll(): Promise<Mot[]> {
    return this.motModel.find().exec();
  }

  async findByLangue(query: string): Promise<Mot[]> {
    return this.motModel
      .find({
        $or: [
          { fr: { $regex: query, $options: 'i' } },
          { kr: { $regex: query, $options: 'i' } },
          { variantes: { $regex: query, $options: 'i' } },
        ],
      })
      .exec();
  }

  async findOneExact(mot: string): Promise<Mot> {
    const result = await this.motModel.findOne({
      $or: [{ fr: mot }, { kr: mot }],
    });
    if (!result) throw new NotFoundException(`Mot "${mot}" introuvable.`);
    return result;
  }

  async findRandom(): Promise<Mot> {
    const [mot] = await this.motModel.aggregate([{ $sample: { size: 1 } }]);
    return mot;
  }

  async incrementViews(id: string): Promise<void> {
    await this.motModel.findByIdAndUpdate(id, { $inc: { vues: 1 } });
  }

  async createMany(mots: CreateMotDto[]) {
    const docs= mots.map((doc) => {
    return { 
      fr: doc.fr,
      kr: doc.kr,
      variantes: doc.variantes,
      genre: doc.genre ?? '', 
      exemples: doc.exemples ?? [], 
      validé: doc.validé ?? false, 
   } });
    return this.motModel.insertMany(docs);
  }



  findOne(id: number) {
    return `This action returns a #${id} mot`;
  }

  update(id: number, updateMotDto: UpdateMotDto) {
    return `This action updates a #${id} mot`;
  }

  remove(id: number) {
    return `This action removes a #${id} mot`;
  }
}
