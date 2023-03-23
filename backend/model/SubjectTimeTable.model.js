import mongoose from 'mongoose'
const subjecttimetable = new mongoose.Schema({

  stream: {
    type: String,
  },
  classname: {
    type: String,
  },
  start1: {
    type: String,
  },
  start2: {
    type: String,
  },
  start3: {
    type: String,
  },
  start4: {
    type: String,
  },
  start5: {
    type: String,
  },
  start6: {
    type: String,
  },
  start7: {
    type: String,
  },
  start8: {
    type: String,
  },
  start9: {
    type: String,
  },
  end1: {
    type: String,
  },
  end2: {
    type: String,
  }, 
  end3: {
    type: String,
  },
  end4: {
    type: String,
  },
  end5: {
    type: String,
  }, 
  end6: {
    type: String,
  },
   end7: {
    type: String,
  },
   end8: {
    type: String,
  },
   end9: {
    type: String,
  },
  mon1: {
    type: String,
  },
  mon2: {
    type: String,
  },
  mon3: {
    type: String,
  },
  mon4: {
    type: String,
  },
  mon5: {
    type: String,
  },
  mon6: {
    type: String,
  },
  mon7: {
    type: String,
  },
  mon8: {
    type: String,
  },
  mon9: {
    type: String,
  },
  tue1: {
    type: String,
  },
  tue2: {
    type: String,
  },
  tue3: {
    type: String,
  },
  tue4: {
    type: String,
  },
  tue5: {
    type: String,
  },
  tue6: {
    type: String,
  },
  tue7: {
    type: String,
  },
  tue8: {
    type: String,
  },
  tue9: {
    type: String,
  },
  wen1: {
    type: String,
  },
  wen2: {
    type: String,
  },
  wen3: {
    type: String,
  },
  wen4: {
    type: String,
  },
  wen5: {
    type: String,
  },
  wen6: {
    type: String,
  },
  wen7: {
    type: String,
  },
  wen8: {
    type: String,
  },
  wen9: {
    type: String,
  },
  tur1: {
    type: String,
  },
  tur2: {
    type: String,
  },
  tur3: {
    type: String,
  },
  tur4: {
    type: String,
  },
  tur5: {
    type: String,
  },
  tur6: {
    type: String,
  },
  tur7: {
    type: String,
  },
  tur8: {
    type: String,
  },
  tur9: {
    type: String,
  },
  fri1: {
    type: String,
  },
  fri2: {
    type: String,
  },
  fri3: {
    type: String,
  },
  fri4: {
    type: String,
  },
  fri5: {
    type: String,
  },
  fri6: {
    type: String,
  },
  fri7: {
    type: String,
  },
  fri8: {
    type: String,
  },
  fri9: {
    type: String,
  }
})

export default mongoose.model('subjecttimetable', subjecttimetable)