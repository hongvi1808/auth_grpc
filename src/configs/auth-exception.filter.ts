import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, RpcExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Catch()
export class AuthExceptionFilter implements RpcExceptionFilter {
    constructor(private readonly code?: string, private readonly message?: string) { }
    catch(exception: any, host: ArgumentsHost) {
        // Log the error details
        Logger.error(
            `Message: ${exception.message}`,
            exception,
            'AuthExceptionFilter',
        );

        // Create the error response object
        const errorResponse = {
            code: exception.code || 'AUTH_ERROR',
            message: exception.message || 'Error from authen service',
        }

        // Trả về lỗi dạng gRPC
        return throwError(() => ({
            code: exception.status || status.INTERNAL,
            message: JSON.stringify(errorResponse), // Chuyển object thành JSON string
        }));
    }
}
