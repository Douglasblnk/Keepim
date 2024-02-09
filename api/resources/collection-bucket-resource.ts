export default {
  CollectionBucket: {
    Type: 'AWS::S3::Bucket',
    Properties: {
      BucketName: 'douglasblnk-keepim-prod-storage',
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedHeaders: [
              '*',
            ],
            AllowedMethods: [
              'PUT',
              'GET',
              'DELETE',
            ],
            AllowedOrigins: [
              '*',
            ],
          },
        ],
      },
    },
  },
}
