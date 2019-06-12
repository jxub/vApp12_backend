class Alarm {
  constructor({
    id,
    timestamp,
    status,
    code,
    name,
    type,
    machine,
    company,
    origin,
    comment
  }) {
    this.id = id;
    this.timestamp = timestamp;
    this.status = status;
    this.code = code;
    this.name = name;
    this.type = type;
    this.machine = machine;
    this.company = company;
    this.origin = origin;
    this.comment = comment;
  }
}

module.exports = Alarm;
