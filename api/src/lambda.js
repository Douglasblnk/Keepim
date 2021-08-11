import awsLambdaFastify from 'aws-lambda-fastify'
import init from './app';

const proxy = awsLambdaFastify(init())

exports.handler = proxy;