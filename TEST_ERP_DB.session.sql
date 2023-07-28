SELECT
   CASE
    WHEN DataModel_smalltextdatamodelcolumn_1.column_name = 'name' THEN DataModel_smalltextdatamodelcolumn_1.value
    ELSE NULL
  END AS name,
  DataModel_integerdatamodelcolumn.value,
  CASE
    WHEN DataModel_smalltextdatamodelcolumn_2.column_name = 'food' THEN DataModel_smalltextdatamodelcolumn_2.value
    ELSE NULL
  END AS food
from
  DataModel_smalltextdatamodelcolumn AS DataModel_smalltextdatamodelcolumn_1
  INNER JOIN DataModel_integerdatamodelcolumn ON DataModel_integerdatamodelcolumn.data_model_id = DataModel_smalltextdatamodelcolumn_1.data_model_id
  AND DataModel_integerdatamodelcolumn.sequence = DataModel_smalltextdatamodelcolumn_1.sequence
  AND DataModel_integerdatamodelcolumn.data_model_id = 68
  INNER JOIN DataModel_smalltextdatamodelcolumn AS DataModel_smalltextdatamodelcolumn_2
  ON DataModel_smalltextdatamodelcolumn_2.data_model_id = DataModel_smalltextdatamodelcolumn_1.data_model_id
  AND DataModel_smalltextdatamodelcolumn_2.sequence = DataModel_smalltextdatamodelcolumn_2.sequence
WHERE
  DataModel_smalltextdatamodelcolumn_1.data_model_id = 68
  AND DataModel_smalltextdatamodelcolumn_1.id < DataModel_smalltextdatamodelcolumn_2.id
  AND DataModel_integerdatamodelcolumn.sequence in (DataModel_smalltextdatamodelcolumn_1.sequence, DataModel_smalltextdatamodelcolumn_2.sequence)
