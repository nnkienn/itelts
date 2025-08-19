# JSON Schema để ép Structured Outputs
IELTS_WRITING_JSON_SCHEMA = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "IeltsWritingResult",
  "type": "object",
  "additionalProperties": False,
  "required": ["modelVersion","overallBand","criteria","feedback","annotations","metrics"],
  "properties": {
    "modelVersion": {"type":"string"},
    "overallBand": {"type":"number","minimum":0,"maximum":9},
    "criteria": {
      "type":"object","additionalProperties":False,
      "required":["taskResponse","coherence","lexical","grammar"],
      "properties":{
        "taskResponse":{"type":"number","minimum":0,"maximum":9},
        "coherence":   {"type":"number","minimum":0,"maximum":9},
        "lexical":     {"type":"number","minimum":0,"maximum":9},
        "grammar":     {"type":"number","minimum":0,"maximum":9}
      }
    },
    "feedback":{"type":"string","minLength":20},
    "annotations":{
      "type":"array",
      "items":{
        "type":"object","additionalProperties":False,
        "required":["type","rule","start","end","before","after","explain"],
        "properties":{
          "type":{"type":"string","enum":["grammar","vocab"]},
          "rule":{"type":"string"},
          "start":{"type":"integer","minimum":0},
          "end":{"type":"integer","minimum":0},
          "before":{"type":"string"},
          "after":{"type":"string"},
          "explain":{"type":"string"}
        }
      }
    },
    "metrics":{
      "type":"object","additionalProperties":False,
      "required":["wordCount"],
      "properties":{"wordCount":{"type":"integer","minimum":0}}
    }
  }
}
