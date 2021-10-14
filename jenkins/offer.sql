
SELECT [id]
      ,[status]
      ,[community]
      ,[strategic_axis_id]
      ,[transversal_axis_id]
      ,[offer_type_id]
      ,[offer_name]
      ,[offer_objective]
      ,[sinip_code]
      ,[offer_description]
      ,[budget_item]
      ,[general_central_program]
      ,[estimated_budget]
      ,[decentralization_Funds]
      ,[other_sources_financing]
      ,[proyect_status]
      ,[institution_id]
      ,[created_user_id]
      ,[date_created]
      ,[updated_user_id]
      ,[approved_comments]
      ,[date_updated]
      ,CONVERT(nvarchar(4000), cast([json] AS NVARCHAR(MAX)))
      ,[observations]
  FROM [PreCOLMENA].[dbo].[Offer]