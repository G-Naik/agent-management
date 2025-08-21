const parseCSV = require("../middleware/parsecsv");
const parseExcel = require("../middleware/parseExcel");
const list = require("../schema/listSchema");  
const Agent = require("../schema/agent");

const uploads = async (request, response) => {
  try {
    const filePath = request.file.path;
    console.log("File path:", filePath);

    let items = [];

    // Parse file
    if (filePath.endsWith(".csv")) {
      items = await parseCSV(filePath);
    } else {
      items = parseExcel(filePath); 
    }

    // Get agent IDs
    const find_Ids = await Agent.distinct("_id");

    // Distribute tasks to agents
    for (let i = 0; i < items.length; i++) {
      const targetedId = find_Ids[i % find_Ids.length];
      await Agent.findByIdAndUpdate(
        targetedId,
        { $push: { taskLists: items[i] } },
        { new: true }
      );
    }

    // Clear old list
    await list.deleteMany({});

    // Save list info (must pass a valid User _id)
    const insertData = {
      items,
      uploadedBy: "admin", // ✅ must be ObjectId, not string
    };

    await list.create(insertData);

    response.status(200).json({
      message: "File uploaded and tasks distributed successfully",
    });
  } catch (err) {
    response.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = { uploads };
