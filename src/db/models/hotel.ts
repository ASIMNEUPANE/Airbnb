import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "./sequelize";

class Hotel extends Model<InferAttributes<Hotel>,InferCreationAttributes<Hotel>>{
    declare id:CreationOptional<number>;
    declare name:string;
    declare address:string;
    declare location:string;
    declare createdAt:CreationOptional<Date>;
    declare updatedAt:CreationOptional<Date>;
    declare rating?:number;
    declare ratingCount?:number;
    declare deletedAt:CreationOptional<Date | null>; ;
}

Hotel.init({
    id:{
        type: 'INTEGER',
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: 'STRING',
        allowNull: false,
    },
    address:{
        type: 'STRING',
        allowNull: false,
    },
    location:{
        type: 'FLOAT',
        allowNull: false,
    },
    rating:{
        type: 'FLOAT',
        defaultValue:null
    },
    ratingCount:{
        type: 'INTEGER',
        defaultValue:null
    },
    createdAt:{
        type: 'DATE',
        defaultValue: new Date(),
    },
    updatedAt:{
        type: 'DATE',
        defaultValue: new Date(),
    },
    deletedAt:{
        type: 'DATE',
        allowNull: true,
        defaultValue: null,
    }
},{
    tableName: 'hotels',
    sequelize,
    // underscored:true, // createdAt -> created_at
    timestamps:true,
});

export default Hotel;