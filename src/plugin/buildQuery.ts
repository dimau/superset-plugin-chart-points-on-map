import {buildQueryContext, QueryFormData} from '@superset-ui/core';

export default function buildQuery(formData: QueryFormData) {
  return buildQueryContext(formData, baseQueryObject => {
    console.log({baseQueryObject});
    return [
      {
        ...baseQueryObject,
        columns: [formData.Longitude, formData.Latitude],
      },
    ];
  });
}
