
class APIFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    //1.filter
    filter(){
        let queryString = JSON.stringify(this.queryStr);//here queryString is a variable and queryStr is object which stores query like ratings[$gte]=4.5
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const queryObj= JSON.parse(queryString);
        this.query = this.query.find(queryObj);
        return this;
    }

    //2.sort
    sort(){          
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
             this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-ratings'); // Default sorting by ratings
         }
        return this;
    }

    //3.limiting fields
    limitFields(){
        if (this.queryStr.fields) {
            const fields=this.queryStr.fields.split(',').join(' ');
            this.query=this.query.select(fields);
            
        } else {
            this.query=this.query.select('-__v');
            
        }
        return this;
    }

     paginate(){

        const page=this.queryStr.page*1||1;
        const limit=this.queryStr.limit*1||100
        const skip=(page-1)*limit;
         this.query=this.query.skip(skip).limit(limit);
         return this;
    }

}


module.exports=APIFeatures;