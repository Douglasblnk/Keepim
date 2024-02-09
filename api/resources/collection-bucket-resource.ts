export default {
  CollectionBucket: {
    Type: 'AWS::S3::Bucket',
    Properties: {
      BucketName: 'douglasblnk-keepim-dev-storage',
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
            MaxAgeSeconds: 3000,
          },
        ],
      },
    },
  },
}
