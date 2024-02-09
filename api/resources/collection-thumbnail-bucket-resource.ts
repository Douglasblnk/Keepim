export default {
  CollectionThumbnailBucket: {
    Type: 'AWS::S3::Bucket',
    Properties: {
      BucketName: 'douglasblnk-keepim-dev-thumbnail-storage',
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
