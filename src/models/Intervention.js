class Intervention {
  constructor({
    id,
    solution,
    comment,
    timestamp,
    duration,
    alarmCode,
    alarmName,
    alarmType,
    machine,
    company,
    status
  }) {
    this.id = id;
    this.solution = solution;
    this.comment = comment;
    this.timestamp = timestamp;
    this.duration = duration;
    this.alarmCode = alarmCode;
    this.alarmName = alarmName;
    this.alarmType = alarmType;
    this.machine = machine;
    this.company = company;
    this.status = status;
  }
}

module.exports = Intervention;
