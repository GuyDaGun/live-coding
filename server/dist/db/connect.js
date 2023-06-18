import mongoose from 'mongoose';
var connectDB = function (url) {
    return mongoose.connect(url);
};
export default connectDB;
//# sourceMappingURL=connect.js.map