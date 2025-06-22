import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ResErrorModel } from './res-error.model';

@Catch()
export class AuthExceptionFilter implements ExceptionFilter {
    constructor(private readonly code?: string, private readonly message?: string, private readonly data?: any) { }
    catch(exception: AuthExceptionFilter, host: ArgumentsHost) {
        const ctx = host.switchToRpc();
        const response = ctx.getData()
        // Log the error details
        Logger.error(
            `Message: ${exception.message}`,
            exception,
            'AuthExceptionFilter',
        );

        // Create the error response object
        const errorResponse: ResErrorModel = {
            success: false,
            code: exception.code || 'AUTH_ERROR',
            statusCode: response.status || HttpStatus.UNAUTHORIZED,
            message: exception.message || 'Error from authen service',
            error: 'AuthExceptionFilter',
            data: exception.data || response.data || null,
        }
        response
            .status(errorResponse.statusCode)
            .json(errorResponse);
    }
}
