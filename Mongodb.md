- **$eq**: Matches values equal to the specified value.
    - Example: db.products.find({ price: { $eq: 29.99 } }) (finds products priced exactly $29.99).
- **$ne**: Matches values not equal to the specified value.
    - Example: db.users.find({ "address.city": { $ne: "New York" } }) (finds users not in New York).
- **$gt**: Matches values greater than the specified value.
    - Example: db.products.find({ price: { $gt: 100 } }) (finds products priced above $100).
- **$gte**: Matches values greater than or equal to the specified value.
    - Example: db.orders.find({ total: { $gte: 500 } }) (finds orders with total >= $500).
- **$lt**: Matches values less than the specified value.
    - Example: db.products.find({ stock: { $lt: 20 } }) (finds products with stock < 20).
- **$lte**: Matches values less than or equal to the specified value.
    - Example: db.reviews.find({ rating: { $lte: 3 } }) (finds reviews with rating <= 3).
- **$in**: Matches any of the values in an array.
    - Example: db.products.find({ category: { $in: ["Electronics", "Books"] } }) (finds products in Electronics or Books).
- **$nin**: Matches none of the values in an array.
    - Example: db.orders.find({ status: { $nin: ["pending", "shipped"] } }) (finds orders not pending or shipped).

#### Logical Query Operators

Combine or negate query conditions.

- **$and**: Matches documents that satisfy all specified conditions.
    - Example: db.products.find({ $and: [{ price: { $gt: 50 } }, { category: "Electronics" }] }) (finds electronics priced > $50).
- **$or**: Matches documents that satisfy at least one of the specified conditions.
    - Example: db.users.find({ $or: [{ "address.city": "New York" }, { "address.city": "London" }] }) (finds users in New York or London).
- **$nor**: Matches documents that fail all specified conditions.
    - Example: db.products.find({ $nor: [{ category: "Clothing" }, { price: { $lt: 10 } }] }) (finds products not in Clothing and not < $10).
- **$not**: Inverts the effect of a query expression.
    - Example: db.reviews.find({ rating: { $not: { $gt: 4 } } }) (finds reviews with rating <= 4).

#### Element Query Operators

Check for the existence or type of fields in documents.

- **$exists**: Matches documents with the specified field (or without it if false).
    - Example: db.users.find({ "address.zip": { $exists: true } }) (finds users with a zip code).
- **$type**: Matches documents where the field is of a specified BSON type (e.g., "string", "number", "objectId").
    - Example: db.products.find({ price: { $type: "number" } }) (finds products with numeric price).

#### Evaluation Query Operators

Perform advanced evaluations like regex or modulo operations.

- **$regex**: Matches string fields using regular expressions.
    - Example: db.users.find({ email: { $regex: ".*@gmail.com$", $options: "i" } }) (finds users with Gmail addresses, case-insensitive).
- **$mod**: Matches documents where a field’s value modulo a divisor equals a remainder.
    - Example: db.products.find({ stock: { $mod: [5, 0] } }) (finds products with stock divisible by 5).
- **$text**: Performs text search on indexed fields (requires a text index).
    - Example: db.products.find({ $text: { $search: "wireless mouse" } }) (finds products matching "wireless mouse").
- **$where**: Uses JavaScript expressions for custom queries (use sparingly for performance).
    - Example: db.orders.find({ $where: "this.total > this.products.length * 100" }) (finds orders with high average item cost).

#### Array Query Operators

Work with arrays in documents.

- **$all**: Matches arrays containing all specified elements.
    - Example: db.products.find({ tags: { $all: ["electronics", "gadget"] } }) (finds products with both tags).
- **$elemMatch**: Matches documents where an array field satisfies multiple conditions.
    - Example: db.orders.find({ products: { $elemMatch: { quantity: { $gt: 3 }, productId: { $exists: true } } } }) (finds orders with a product quantity > 3).
- **$size**: Matches arrays with a specific number of elements.
    - Example: db.orders.find({ products: { $size: 2 } }) (finds orders with exactly 2 products).

#### Geospatial Query Operators

Used for geospatial data (requires geospatial indexes).

- **$geoWithin**: Matches points within a specified geometry (e.g., polygon, circle).
    - Example: db.users.find({ location: { $geoWithin: { $center: [[0, 0], 10] } } }) (finds users within a 10-unit radius of [0,0]).
- **$geoIntersects**: Matches geometries that intersect with a specified geometry.
- **$near**: Returns documents sorted by proximity to a point (requires a geospatial index).
    - Example: db.users.find({ location: { $near: { $geometry: { type: "Point", coordinates: [0, 0] } } } }).
- **$nearSphere**: Similar to $near but accounts for Earth’s curvature.

#### Bitwise Query Operators

Perform bitwise operations on integer fields.

- **$bitsAllSet**: Matches documents where all specified bits are set.
    - Example: db.products.find({ flags: { $bitsAllSet: [0, 1] } }).
- **$bitsAnySet**: Matches documents where any specified bits are set.
- **$bitsAllClear**: Matches documents where all specified bits are clear.
- **$bitsAnyClear**: Matches documents where any specified bits are clear.

#### Comments Operator

- **$comment**: Attaches a comment to a query for debugging or logging.
    - Example: db.products.find({ price: { $gt: 100 } }).comment("High-priced products query").
      
      
      ### Complete List of MongoDB Aggregation Pipeline Stages

Below is a list of all aggregation pipeline stages, organized alphabetically for clarity, with examples using your ecommerce database. These stages are used within the db.collection.aggregate([stage1, stage2, ...]) syntax.

1. **$addFields**
    - **Purpose**: Adds new fields to documents without removing existing ones.
    - **Example**: Add a field for discounted price (10% off) to products.
        
        javascript
        
        Copy
        
        `{ $addFields: { discountedPrice: { $multiply: ["$price", 0.9] } } }`
        
2. **$bucket**
    - **Purpose**: Groups documents into buckets based on a specified expression (e.g., ranges of values).
    - **Example**: Group products by price ranges (e.g., 0-50, 50-100, etc.).
        
        javascript
        
        Copy
        
        `{ $bucket: { groupBy: "$price", boundaries: [0, 50, 100, 200, 500], default: "Other", output: { count: { $sum: 1 }, avgPrice: { $avg: "$price" } } } }`
        
3. **$bucketAuto**
    - **Purpose**: Automatically groups documents into a specified number of buckets based on a field, with dynamically determined ranges.
    - **Example**: Group orders into 5 buckets by total amount.
        
        javascript
        
        Copy
        
        `{ $bucketAuto: { groupBy: "$total", buckets: 5, output: { count: { $sum: 1 }, avgTotal: { $avg: "$total" } } } }`
        
4. **$collStats**
    - **Purpose**: Returns statistics about the collection, such as storage size or index details (useful for performance analysis).
    - **Example**: Get storage stats for the orders collection.
        
        javascript
        
        Copy
        
        `{ $collStats: { storageStats: {} } }`
        
5. **$count**
    - **Purpose**: Counts the number of documents in the pipeline.
    - **Example**: Count delivered orders.
        
        javascript
        
        Copy
        
        `{ $match: { status: "delivered" } }, { $count: "deliveredOrders" }`
        
6. **$densify**
    - **Purpose**: Adds documents to fill gaps in a sequence of values (e.g., time series data).
    - **Example**: Densify orders by createdAt date to ensure one document per day (requires a date field with gaps).
        
        javascript
        
        Copy
        
        `{ $densify: { field: "createdAt", range: { step: 1, unit: "day", bounds: "full" } } }`
        
7. **$documents**
    - **Purpose**: Creates a stream of documents from an array (useful for testing or generating data).
    - **Example**: Generate a pipeline with sample documents (not directly tied to a collection).
        
        javascript
        
        Copy
        
        `{ $documents: [ { test: "sample1" }, { test: "sample2" } ] }`
        
8. **$facet**
    - **Purpose**: Processes multiple aggregation pipelines on the same input documents, returning results as separate fields.
    - **Example**: Get both high-rated and low-rated reviews in one pipeline.
        
        javascript
        
        Copy
        
        `{ $facet: { highRated: [ { $match: { rating: { $gte: 4 } } }, { $count: "highRatedCount" } ], lowRated: [ { $match: { rating: { $lte: 2 } } }, { $count: "lowRatedCount" } ] } }`
        
9. **$fill**
    - **Purpose**: Fills missing field values in documents (e.g., with a default or interpolated value).
    - **Example**: Fill missing ratings in reviews with the average rating.
        
        javascript
        
        Copy
        
        `{ $fill: { output: { rating: { method: "locf" } } // Last observed carried forward } }`
        
10. **$geoNear**
    - **Purpose**: Returns documents sorted by proximity to a geospatial point (requires a geospatial index).
    - **Example**: Find users near a point (assuming users has a location field with 2dsphere index).
        
        javascript
        
        Copy
        
        `{ $geoNear: { near: { type: "Point", coordinates: [0, 0] }, distanceField: "distance", spherical: true } }`
        
11. **$graphLookup**
    - **Purpose**: Performs a recursive graph search to find connected documents (e.g., hierarchical data).
    - **Example**: Find a user’s referral chain (if users had a referredBy field).
        
        javascript
        
        Copy
        
        `{ $graphLookup: { from: "users", startWith: "$referredBy", connectFromField: "referredBy", connectToField: "_id", as: "referralChain" } }`
        
12. **$group**
    - **Purpose**: Groups documents by a specified field and applies accumulator operators (e.g., $sum, $avg).
    - **Example**: Calculate total orders per user.
        
        javascript
        
        Copy
        
        `{ $group: { _id: "$userId", totalOrders: { $sum: 1 }, avgOrderTotal: { $avg: "$total" } } }`
        
13. **$indexStats**
    - **Purpose**: Returns statistics about index usage.
    - **Example**: Analyze index usage for the products collection.
        
        javascript
        
        Copy
        
        `{ $indexStats: {} }`
        
14. **$limit**
    - **Purpose**: Limits the number of documents passed to the next stage.
    - **Example**: Get the top 5 highest-priced products.
        
        javascript
        
        Copy
        
        `{ $sort: { price: -1 } }, { $limit: 5 }`
        
15. **$listSessions**
    - **Purpose**: Lists session information for the database (requires admin privileges).
    - **Example**: List active sessions (run on admin database).
        
        javascript
        
        Copy
        
        `db.getSiblingDB("admin").aggregate([{ $listSessions: {} }])`
        
16. **$lookup**
    - **Purpose**: Performs a left outer join with another collection.
    - **Example**: Join orders with user details.
        
        javascript
        
        Copy
        
        `{ $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "userDetails" } }`
        
17. **$match**
    - **Purpose**: Filters documents based on specified conditions.
    - **Example**: Filter orders with status “shipped”.
        
        javascript
        
        Copy
        
        `{ $match: { status: "shipped" } }`
        
18. **$merge**
    - **Purpose**: Writes pipeline results to a collection (overwrites, appends, or merges).
    - **Example**: Save aggregated review stats to a new collection.
        
        javascript
        
        Copy
        
        `{ $merge: { into: "reviewStats", whenMatched: "merge", whenNotMatched: "insert" } }`
        
19. **$out**
    - **Purpose**: Writes pipeline results to a new collection, replacing its contents.
    - **Example**: Save total sales by category to a new collection.
        
        javascript
        
        Copy
        
        `{ $out: "categorySales" }`
        
20. **$project**
    - **Purpose**: Reshapes documents by including, excluding, or adding fields.
    - **Example**: Show only product name and price.
        
        javascript
        
        Copy
        
        `{ $project: { name: 1, price: 1, _id: 0 } }`
        
21. **$redact**
    - **Purpose**: Restricts document content based on conditions (e.g., for security).
    - **Example**: Redact user email addresses for non-admins (requires a role field).
        
        javascript
        
        Copy
        
        `{ $redact: { $cond: { if: { $eq: ["$role", "admin"] }, then: "$$KEEP", else: { $project: { email: 0 } } } } }`
        
22. **$replaceRoot**
    - **Purpose**: Replaces the document with a specified embedded document.
    - **Example**: Replace order documents with their userDetails from a $lookup.
        
        javascript
        
        Copy
        
        `{ $replaceRoot: { newRoot: "$userDetails" } }`
        
23. **$replaceWith**
    - **Purpose**: Replaces the document with a new one (similar to $replaceRoot).
    - **Example**: Replace order documents with a simplified structure.
        
        javascript
        
        Copy
        
        `{ $replaceWith: { orderId: "$_id", total: "$total" } }`
        
24. **$sample**
    - **Purpose**: Randomly selects a specified number of documents.
    - **Example**: Get 10 random products.
        
        javascript
        
        Copy
        
        `{ $sample: { size: 10 } }`
        
25. **$set**
    - **Purpose**: Adds or updates fields (alias for $addFields).
    - **Example**: Set a field for order year.
        
        javascript
        
        Copy
        
        `{ $set: { orderYear: { $year: "$createdAt" } } }`
        
26. **$setWindowFields**
    - **Purpose**: Performs window-based computations (e.g., moving averages).
    - **Example**: Calculate a moving average of order totals (requires sorted data).
        
        javascript
        
        Copy
        
        `{ $setWindowFields: { partitionBy: "$userId", sortBy: { createdAt: 1 }, output: { movingAvgTotal: { $avg: "$total", window: { documents: [-5, 5] } } } } }`
        
27. **$skip**
    - **Purpose**: Skips a specified number of documents.
    - **Example**: Skip the first 10 products after sorting.
        
        javascript
        
        Copy
        
        `{ $sort: { price: 1 } }, { $skip: 10 }`
        
28. **$sort**
    - **Purpose**: Sorts documents by a field.
    - **Example**: Sort reviews by rating descending.
        
        javascript
        
        Copy
        
        `{ $sort: { rating: -1 } }`
        
29. **$sortByCount**
    - **Purpose**: Groups documents by a field and counts occurrences, sorting by count.
    - **Example**: Count orders by status.
        
        javascript
        
        Copy
        
        `{ $sortByCount: "$status" }`
        
30. **$unionWith**
    - **Purpose**: Combines documents from another collection or pipeline.
    - **Example**: Combine orders and reviews into a single stream.
        
        javascript
        
        Copy
        
        `{ $unionWith: { coll: "reviews", pipeline: [{ $project: { productId: 1, rating: 1 } }] } }`
        
31. **$unset**
    - **Purpose**: Removes fields from documents.
    - **Example**: Remove the comment field from reviews.
        
        javascript
        
        Copy
        
        `{ $unset: "comment" }`
        
32. **$unwind**
    - **Purpose**: Deconstructs an array field to output one document per array element.
    - **Example**: Unwind the products array in orders.
        
        javascript
        
        Copy
        
        `{ $unwind: "$products" }`
        

### Tips for Mastering Pipeline Stages

- **Practice with Your Database**: Use the ecommerce database to test these stages. For example, try $lookup to join orders with users or $bucket to analyze price ranges in products.
- **Combine Stages**: Build complex pipelines by combining stages like $match, $group, and $sort. Start with simple pipelines and gradually add complexity.
- **Optimize Performance**:
    - Place $match and $sort early to reduce the dataset.
    - Create indexes for fields used in $match, $sort, or $group (e.g., db.orders.createIndex({ status: 1 })).
    - Use explain("executionStats") to analyze pipeline performance.
- **Experiment with Edge Cases**: Test stages like $densify or $setWindowFields with time-based data or $graphLookup with hierarchical data (you may need to add fields to your database).
- **Debugging**: Use $project to inspect intermediate results or $limit to test on smaller datasets.
- **Resources**:
    - MongoDB University: “M121: MongoDB Aggregation Framework” (free course).
    - Official Documentation: [Aggregation Pipeline Stages](https://www.mongodb.com/docs/manual/reference/operator/aggregation/).

### Sample Pipeline Exercises

Try these exercises with your ecommerce database in mongosh or Compass:

1. **Calculate Total Revenue by Year**:
    
    javascript
    
    Copy
    
    `db.orders.aggregate([ { $set: { orderYear: { $year: "$createdAt" } } }, { $group: { _id: "$orderYear", totalRevenue: { $sum: "$total" } } }, { $sort: { _id: 1 } } ]);`
    
2. **Sample 5 Random Users with Their Orders**:
    
    javascript
    
    Copy
    
    `db.users.aggregate([ { $sample: { size: 5 } }, { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "orders" } }, { $project: { name: 1, orderCount: { $size: "$orders" } } } ]);`
    
3. **Group Products by Stock Levels**:
    
    javascript
    
    Copy
    
    `db.products.aggregate([ { $bucket: { groupBy: "$stock", boundaries: [0, 50, 100, 200], default: "High Stock", output: { count: { $sum: 1 } } } } ]);`

MongoDB is a rich NoSQL database with a wide range of terms, operators, and concepts that are essential for mastering it, especially given your goal of studying with the seeded ecommerce database (users, products, orders, reviews). Below, I’ll provide a comprehensive list of key MongoDB terms, grouped by category (e.g., aggregation-related, query operators, database components, etc.), focusing on those relevant to your study. For each category, I’ll include definitions and, where applicable, examples tailored to your database. Since you specifically mentioned "accumulator stages" and given your focus on aggregation, I’ll emphasize aggregation-related terms but cover all major MongoDB terms to ensure completeness.

This response will be structured for clarity and study, keeping explanations concise yet informative. If you want deeper dives into specific terms or examples, let me know!

### MongoDB Terms by Category

#### 1. Core Database Concepts

These are fundamental terms related to MongoDB’s structure and operations.

- **Document**: The basic unit of data in MongoDB, stored as a JSON-like (BSON) object with key-value pairs.
    - Example: { _id: ObjectId("..."), name: "Wireless Mouse", price: 29.99 } in the products collection.
- **Collection**: A group of MongoDB documents, analogous to a table in SQL but schema-less.
    - Example: The users collection in your ecommerce database.
- **Database**: A container for collections.
    - Example: Your ecommerce database containing users, products, orders, and reviews.
- **BSON**: Binary JSON, the format MongoDB uses to store documents, supporting additional data types like ObjectId.
- **ObjectId**: A 12-byte unique identifier for documents, typically used as the _id field.
    - Example: _id: ObjectId("507f1f77bcf86cd799439011").
- **Schema**: The structure of documents in a collection, which is flexible in MongoDB (not enforced).
    - Example: Your products collection has fields like name, price, category.
- **Replica Set**: A group of MongoDB servers maintaining the same data for redundancy and high availability.
    - Example: A primary node and two secondary nodes for your ecommerce database.
- **Sharding**: Distributing data across multiple servers to improve scalability.
    - Example: Sharding the orders collection by userId for large-scale data.
- **Index**: A data structure to improve query performance.
    - Example: db.products.createIndex({ price: 1 }) for faster price-based queries.
- **CRUD Operations**: Create, Read, Update, Delete operations for managing data.
    - Example: db.users.insertOne({ name: "John" }) (Create), db.users.find() (Read).

#### 2. Query Operators

These operators are used in find() and $match stages to filter documents. (You previously requested these, so I’ll summarize key categories; refer to the earlier response for the full list.)

- **Comparison Operators**: $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin.
    - Example: db.products.find({ price: { $gt: 100 } }) (products priced > $100).
- **Logical Operators**: $and, $or, $nor, $not.
    - Example: db.orders.find({ $and: [{ status: "shipped" }, { total: { $gt: 500 } }] }).
- **Element Operators**: $exists, $type.
    - Example: db.users.find({ "address.zip": { $exists: true } }).
- **Evaluation Operators**: $regex, $mod, $text, $where.
    - Example: db.users.find({ email: { $regex: "@gmail.com$" } }).
- **Array Operators**: $all, $elemMatch, $size.
    - Example: db.orders.find({ products: { $size: 2 } }).
- **Geospatial Operators**: $geoWithin, $geoIntersects, $near, $nearSphere.
    - Example: Requires a location field with a 2dsphere index.
- **Bitwise Operators**: $bitsAllSet, $bitsAnySet, $bitsAllClear, $bitsAnyClear.

#### 3. Aggregation Pipeline Stages

These are the stages used in db.collection.aggregate([]). (You requested all stages earlier, so I’ll summarize; see the previous response for details and examples.)

- **Stages** (32 total, as of MongoDB 7.0):
    - $addFields, $bucket, $bucketAuto, $collStats, $count, $densify, $documents, $facet, $fill, $geoNear, $graphLookup, $group, $indexStats, $limit, $listSessions, $lookup, $match, $merge, $out, $project, $redact, $replaceRoot, $replaceWith, $sample, $set, $setWindowFields, $skip, $sort, $sortByCount, $unionWith, $unset, $unwind.
    - Example: db.products.aggregate([{ $match: { price: { $gt: 100 } } }, { $group: { _id: "$category", count: { $sum: 1 } } }]).

#### 4. Accumulator Operators (Used in $group, $bucket, etc.)

These operators aggregate data within grouping stages like $group or $bucket.

- **$addToSet**: Creates an array of unique values.
    - Example: db.orders.aggregate([{ $group: { _id: "$userId", statuses: { $addToSet: "$status" } } }]) (unique statuses per user).
- **$avg**: Calculates the average of numeric values.
    - Example: db.reviews.aggregate([{ $group: { _id: "$productId", avgRating: { $avg: "$rating" } } }]).
- **$count**: Counts documents (MongoDB 5.0+ in $group).
    - Example: db.orders.aggregate([{ $group: { _id: "$status", count: { $count: {} } } }]).
- **$first**: Returns the first value in a group.
    - Example: db.products.aggregate([{ $group: { _id: "$category", firstProduct: { $first: "$name" } } }]).
- **$last**: Returns the last value in a group.
- **$max**: Returns the maximum value.
    - Example: db.products.aggregate([{ $group: { _id: "$category", maxPrice: { $max: "$price" } } }]).
- **$min**: Returns the minimum value.
- **$push**: Creates an array of all values in a group.
    - Example: db.orders.aggregate([{ $group: { _id: "$userId", orderIds: { $push: "$_id" } } }]).
- **$sum**: Sums numeric values or counts documents (if used with 1).
    - Example: db.orders.aggregate([{ $group: { _id: "$status", total: { $sum: "$total" } } }]).
- **$stdDevPop**: Calculates population standard deviation.
- **$stdDevSamp**: Calculates sample standard deviation.
- **Window Accumulators** (used in $setWindowFields):
    - $rank, $denseRank, $documentNumber, $rowNumber, $shift, $expMovingAvg, $integral, $derivative.

#### 5. Expression Operators

Used within aggregation stages (e.g., $project, $addFields) to compute values.

- **Arithmetic**: $add, $subtract, $multiply, $divide, $mod, $abs, $ceil, $floor, $round.
    - Example: { $project: { discountedPrice: { $multiply: ["$price", 0.9] } } }.
- **Array**: $arrayElemAt, $concatArrays, $filter, $map, $reduce, $size, $slice.
    - Example: { $project: { firstProduct: { $arrayElemAt: ["$products", 0] } } }.
- **Boolean**: $and, $or, $not.
- **Comparison**: $eq, $ne, $gt, $gte, $lt, $lte, $cmp.
- **Conditional**: $cond, $ifNull, $switch.
    - Example: { $project: { status: { $cond: { if: { $gt: ["$price", 100] }, then: "expensive", else: "affordable" } } } }.
- **Date**: $year, $month, $dayOfMonth, $hour, $minute, $second, $dateAdd, $dateDiff.
    - Example: { $project: { orderYear: { $year: "$createdAt" } } }.
- **String**: $concat, $substr, $toLower, $toUpper, $trim, $regexMatch.
    - Example: { $project: { nameLower: { $toLower: "$name" } } }.
- **Type Conversion**: $toString, $toInt, $toDouble, $toDate, $toObjectId.
- **Aggregation-Specific**: $function, $accumulator (for custom JavaScript logic).

#### 6. Indexing Terms

- **Single Index**: Indexes a single field.
    - Example: db.products.createIndex({ price: 1 }).
- **Compound Index**: Indexes multiple fields.
    - Example: db.orders.createIndex({ userId: 1, createdAt: -1 }).
- **Text Index**: Supports text search.
    - Example: db.products.createIndex({ name: "text" }).
- **Geospatial Index**: Supports location-based queries (2d, 2dsphere).
- **TTL Index**: Automatically deletes documents after a time period.
    - Example: db.orders.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 }).
- **Multikey Index**: Indexes arrays.
- **Hashed Index**: Indexes hashed values for sharding.

#### 7. Other Key Terms

- **Write Concern**: Specifies the acknowledgment level for write operations.
    - Example: db.users.insertOne({ name: "John" }, { writeConcern: { w: "majority" } }).
- **Read Concern**: Specifies the data consistency level for reads.
    - Example: db.users.find().readConcern("majority").
- **Read Preference**: Determines which replica set member to read from (e.g., primary, secondary).
- **Transaction**: A sequence of operations executed as a single unit (MongoDB 4.0+).
    - Example: Multi-document transaction to update orders and products stock.
- **Atlas**: MongoDB’s cloud-hosted database service.
    - Example: Your seeded database could be hosted on Atlas.
- **mongosh**: MongoDB’s command-line shell for interacting with the database.
- **Compass**: MongoDB’s GUI for visualizing and managing data.
- **Change Streams**: Monitors real-time changes to collections.
    - Example: Watch for new orders: db.orders.watch().

### Study Tips with Your E-Commerce Database

- **Practice Accumulators**:
    - Use $sum, $avg, $push in $group to analyze orders (e.g., total revenue by user).
    - Example: db.orders.aggregate([{ $group: { _id: "$userId", totalSpent: { $sum: "$total" } } }]).
- **Explore Expression Operators**:
    - Use $concat in $project to combine fields (e.g., user name and city).
    - Example: { $project: { fullAddress: { $concat: ["$address.street", ", ", "$address.city"] } } }.
- **Test Pipeline Stages**:
    - Combine $match, $group, $lookup, $unwind to join orders with users and products.
    - Example: See previous responses for multi-collection pipelines.
- **Indexing**: Create indexes on frequently queried fields (e.g., price, category) and test with explain().
- **Resources**:
    - MongoDB University: “M121: MongoDB Aggregation Framework” for accumulators and stages.
    - Official Documentation: [MongoDB Reference](https://www.mongodb.com/docs/manual/reference/).

### Sample Exercises

1. **Use Accumulators**: Calculate the average and maximum price per category in products:
    
    javascript
    
    Copy
    
    `db.products.aggregate([ { $group: { _id: "$category", avgPrice: { $avg: "$price" }, maxPrice: { $max: "$price" } } } ]);`
    
2. **Use Expression Operators**: Add a field to orders indicating if the total is "high" (> $500) or "low":
    
    javascript
    
    Copy
    
    `db.orders.aggregate([ { $project: { total: 1, priceLevel: { $cond: { if: { $gt: ["$total", 500] }, then: "high", else: "low" } } } } ]);`
    
3. **Combine Stages**: Find the top 5 users by order count with their names:
    
    javascript
    
    Copy
    
    `db.orders.aggregate([ { $group: { _id: "$userId", orderCount: { $sum: 1 } } }, { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } }, { $unwind: "$user" }, { $project: { userName: "$user.name", orderCount: 1, _id: 0 } }, { $sort: { orderCount: -1 } }, { $limit: 5 } ]);`
    
    In MongoDB, the **$lookup** stage is an aggregation pipeline stage that performs a **left outer join** between two collections in the same database. It allows you to combine documents from one collection with matching documents from another collection based on specified fields, enabling you to enrich or aggregate data across collections. Since you’re studying MongoDB with your seeded ecommerce database (users, products, orders, reviews), I’ll explain $lookup in detail, provide examples using your database, and offer tips to help you master it.

### What is $lookup?

- **Purpose**: $lookup retrieves documents from a "foreign" collection and joins them with documents in the current collection based on matching fields. The result is an array of matched documents added to each input document.
- **Use Case**: When you need to combine data from multiple collections, such as joining orders with users to include user details or orders with products to include product names.
- **Syntax**:
    
    javascript
    
    Copy
    
    `{ $lookup: { from: "<foreign-collection>", localField: "<field-in-current-collection>", foreignField: "<field-in-foreign-collection>", as: "<output-array-field>" } }`
    
    - from: The name of the collection to join with.
    - localField: The field in the current collection to match.
    - foreignField: The field in the foreign collection to match against.
    - as: The name of the array field where matched documents are stored.

### How $lookup Works

- $lookup matches each document in the pipeline to documents in the from collection where localField equals foreignField.
- The matched documents are added as an array in the as field. If no matches are found, the array is empty (left outer join behavior).
- Often followed by $unwind to flatten the array for easier processing.
  
  ### Enhancements for Study

To make the output more readable and useful, you can add a $project stage to select specific fields:

javascript

Copy

`db.users.aggregate([ { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "userBookings" } }, { $limit: 10 }, { $unwind: "$userBookings" }, { $project: { userName: "$name", userEmail: "$email", orderId: "$userBookings._id", orderTotal: "$userBookings.total", orderStatus: "$userBookings.status", _id: 0 } } ]).pretty();`

- **Output**:
    
    javascript
    
    Copy
    
    `{ "userName": "John Doe", "userEmail": "john.doe@example.com", "orderId": ObjectId("..."), "orderTotal": 199.99, "orderStatus": "shipped" }`
    

### Including Users with No Orders

By default, $unwind excludes users whose userBookings array is empty (i.e., users with no orders). To include them, use preserveNullAndEmptyArrays: true:

javascript

Copy

`db.users.aggregate([ { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "userBookings" } }, { $limit: 10 }, { $unwind: { path: "$userBookings", preserveNullAndEmptyArrays: true } }, { $project: { userName: "$name", userEmail: "$email", orderId: "$userBookings._id", orderTotal: "$userBookings.total", orderStatus: "$userBookings.status", _id: 0 } } ]).pretty();`

- **Output for Users with No Orders**:
    
    javascript
    
    Copy
    
    `{ "userName": "Jane Smith", "userEmail": "jane.smith@example.com", "orderId": null, "orderTotal": null, "orderStatus": null }`
    
    #####    To deepen your understanding of $lookup and related concepts:

1. **Join with Products**: Extend the pipeline to include product names for each order’s products:
    
    javascript
    
    Copy
    
    `db.users.aggregate([ { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "userBookings" } }, { $limit: 10 }, { $unwind: "$userBookings" }, { $unwind: "$userBookings.products" }, { $lookup: { from: "products", localField: "userBookings.products.productId", foreignField: "_id", as: "productDetails" } }, { $unwind: "$productDetails" }, { $project: { userName: "$name", orderId: "$userBookings._id", productName: "$productDetails.name", quantity: "$userBookings.products.quantity", _id: 0 } } ]);`
    
2. **Filter Orders by Status**: Count orders with status “shipped” for the first 10 users:
    
    javascript
    
    Copy
    
    `db.users.aggregate([ { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "userBookings" } }, { $limit: 10 }, { $unwind: "$userBookings" }, { $match: { "userBookings.status": "shipped" } }, { $count: "shippedOrders" } ]);`
    
3. **Advanced $lookup with Pipeline**: Join only with orders where total > 500:
    
    javascript
    
    Copy
    
    `db.users.aggregate([ { $lookup: { from: "orders", let: { userId: "$_id" }, pipeline: [ { $match: { $expr: { $and: [{ $eq: ["$userId", "$$userId"] }, { $gt: ["$total", 500] }] } } } ], as: "userBookings" } }, { $limit: 10 }, { $unwind: "$userBookings" } ]);`
    
    Try these with your ecommerce database to reinforce learning:

4. **Count Orders with Total > $500**:
    
    javascript
    
    Copy
    
    `db.users.aggregate([ { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "userBookings" } }, { $limit: 10 }, { $unwind: "$userBookings" }, { $match: { "userBookings.total": { $gt: 500 } } }, { $count: "highValueOrders" } ]);`
    
5. **Count Orders per User with Product Details**:
    
    javascript
    
    Copy
    
    `db.users.aggregate([ { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "userBookings" } }, { $limit: 10 }, { $unwind: "$userBookings" }, { $unwind: "$userBookings.products" }, { $lookup: { from: "products", localField: "userBookings.products.productId", foreignField: "_id", as: "productDetails" } }, { $unwind: "$productDetails" }, { $group: { _id: "$_id", userName: { $first: "$name" }, orderCount: { $sum: 1 }, productNames: { $push: "$productDetails.name" } } } ]);`
    
6. **Advanced $lookup with Pipeline**: Count orders placed in 2025 for the first 10 users:
    
    javascript
    
    Copy
    
    `db.users.aggregate([ { $lookup: { from: "orders", let: { userId: "$_id" }, pipeline: [ { $match: { $expr: { $and: [ { $eq: ["$userId", "$$userId"] }, { $gte: ["$createdAt", new Date("2025-01-01")] }, { $lte: ["$createdAt", new Date("2025-12-31")] } ] } } } ], as: "userBookings" } }, { $limit: 10 }, { $unwind: "$userBookings" }, { $count: "ordersIn2025" } ]);`
    
    