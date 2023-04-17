class EventController {
  constructor(model, categoriesModel, subcategoriesModel) {
    this.model = model;
    this.categoriesModel = categoriesModel;
    this.subcategoriesModel = subcategoriesModel;
  }

  // Event content
  getPetEvents = async (req, res) => {
    const { petId } = req.params;
    try {
      const events = await this.model.findAll({
        where: { petId: petId },
        order: [["startTime", "DESC"]],
      });
      return res.json(events);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addEvent = async (req, res) => {
    const { petId } = req.params;
    console.log(petId);
    const {
      categoryId,
      subcategoryId,
      name,
      startTime,
      endTime,
      causeForConcern,
      description,
      data,
      unit,
      imageUrl,
      locationDetails,
      remindMe,
    } = req.body;
    console.log(categoryId, subcategoryId);
    try {
      await this.model.create({
        petId,
        categoryId,
        subcategoryId,
        name,
        startTime,
        endTime,
        causeForConcern,
        description,
        data,
        unit,
        imageUrl,
        locationDetails,
        remindMe,
      });
      const events = await this.model.findAll({
        where: { petId: petId },
        order: [["startTime", "DESC"]],
      });
      return res.json(events);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  editEvent = async (req, res) => {
    const { petId, eventId } = req.params;
    const {
      categoryId,
      subcategoryId,
      name,
      startTime,
      endTime,
      causeForConcern,
      description,
      data,
      unit,
      imageUrl,
      locationDetails,
      remindMe,
    } = req.body;
    try {
      await this.model.update(
        {
          categoryId,
          subcategoryId,
          name,
          startTime,
          endTime,
          causeForConcern,
          description,
          data,
          unit,
          imageUrl,
          locationDetails,
          remindMe,
          updatedAt: new Date(),
        },
        {
          where: { id: eventId },
        }
      );
      const events = await this.model.findAll({
        where: { petId: petId },
        order: [["startTime", "DESC"]],
      });
      return res.json(events);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Event categorization
}

module.exports = EventController;
