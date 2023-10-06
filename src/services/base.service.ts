import {environment} from "../environment";

export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiResponse<T> {
	statusCode: number;
	responseObj?: T;
	error?: string;
	isBadRequest?: boolean;
}
export interface IApiResponse{
    statusCode:number;
    messages: string;
    result: any;
}

export class BaseService {
    protected async callApi<T>(
        route: string,
        method: RequestMethod,
        urlParams?: URLSearchParams,
		requestData?: object | any[],
		fetchToken = true,
		isFileUpload?: boolean,
        isTextResponse = false
    ): Promise<T> {
        try {
			let headers: Record<string, string> = {};
			if (fetchToken) {
				const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIxYzNkNjIxNi04YzY0LTRhODYtYjgwYi0xZjM2N2RlYzEyYjQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vZWFjMDM0NDYtMGIyNy00ODdiLTk0ZjgtYWU3OTUxNThhMjMzL3YyLjAiLCJpYXQiOjE2OTU4MDU4NDAsIm5iZiI6MTY5NTgwNTg0MCwiZXhwIjoxNjk1ODA5NzQwLCJhaW8iOiJBVlFBcS84VUFBQUFhRjZpaFVVWTdSZ1ZMajBQMlNwM3kwMWd6anFLQXdVTy92Qm1ITjdydnRMZEg5ZE91Wm9LSnVhcXlJWkFZTnVYWHRBVmk4a1FEOEhDNEkxeDVhTTNOQzBTdjRGblA4bFV6MjFPdFgzeXJGdz0iLCJlbWFpbCI6ImphdGluLmRldmdhbml5YUB0YXR2YW1haWwuY29tIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZmNmYTEwZTYtYjU0NS00YjViLWJlYjUtOWE0YzAyODk5Zjk4LyIsIm5hbWUiOiJKYXRpbiBEZXZnYW5peWEiLCJub25jZSI6IjZiYWEyYzhiLWQ5ZjYtNGEzNS04NGI1LWJmYWE3NjI4MDVjMyIsIm9pZCI6IjQwMWFiYWQxLTAwMjktNDliOS04OWIyLWE5MDA5NzU2OGVmMCIsInByZWZlcnJlZF91c2VybmFtZSI6ImphdGluLmRldmdhbml5YUB0YXR2YW1haWwuY29tIiwicmgiOiIwLkFZRUFSalRBNmljTGUwaVUtSzU1VVZpaU14WmlQUnhraklaS3VBc2ZObjNzRXJTQkFQQS4iLCJzdWIiOiJqLXlTY0QzbHpZM0Eyd3JIRnJOX2lZU1BVSUV5M0FGekVTYUI5UGpkQkRBIiwidGlkIjoiZWFjMDM0NDYtMGIyNy00ODdiLTk0ZjgtYWU3OTUxNThhMjMzIiwidXRpIjoiNmVUdzFLdkIxVUttZEN2X0lpVjFBQSIsInZlciI6IjIuMCJ9.M-_kWP0xN53a7n0zK4YoXmHWlvt5zDaOcvsrKVvKzsUNvWwKg1tqPlLaQt0ghCAS8avtTYQITGlCrNN4GKAx0dU4yyHa1zxyD71UdZ6IU5snBN-1dNIIgylzHmX0dHz_2H9z4tPtBU3nBqL6Ay4V1NlGVox_a9V17vBDHJYgKkxPjDlaqwPH3FKl0-MM70aglP0tQKhr2-JtOyadBdHEN0UKP-1ayIz4VhAQDYoPKgfu5zulMoSWAJcjmxNtzP6jQpOL2IGOVz0HKLM9YJCHf9rjjsoqtOT9UikdxdcSEEhtDSpbFtO5UDw3koJU7cyh7TH8_KITk2orx0YT30f4Cw";
				headers = {
					Authorization: `Bearer ${token}`,
				};
			}
            let body: string | undefined | FormData;
			const url = `${environment.apiUrl}/${route}${
				urlParams ? `?${urlParams.toString()}` : ""
            }`;
            if (requestData) {
				if (method === "GET") {
					return await this.response({
						statusCode: 500,
						error: "Invalid request, GET requests cannot have a body",
					});
				}
				if (!isFileUpload) {
					headers["Content-Type"] =
						method === "PATCH"
							? "application/json-patch+json"
							: "application/json";
					body = JSON.stringify(requestData);
				} else {
					body = requestData as FormData;
				}
			
            }
            const res = await fetch(url, {
				method,
				headers,
				body,
            });
            if (res.ok) {
				try {
				
					// if api returns no content
					if (res.status === 204) {
						return await this.response({
							statusCode: res.status,
						});
					}

					const resData = await res.json();
					// res = "OK", but internal API error, response returned with 400 and error message
					if (resData.statusCode === 400) {
						return this.response({
							statusCode: resData.statusCode,
							error: resData.messages,
							responseObj: resData.result as T,
							isBadRequest: true,
						});
					}
					return await this.response({
						statusCode: res.status,
						responseObj: isTextResponse ? resData : (resData.result as T),
					});
				} catch (err) {
					return this.response({
						statusCode: res.status,
						error: "failed to parse response returned by server",
					});
				}
			} else {
				return await this.response({
					statusCode: res.status,
					error: res.statusText,
					responseObj: res as unknown as T,
				});
			}
        }
        catch (error) {
			const err = error as any;
            return this.response({
                statusCode: err.statusCode,
				error: err.error,
				responseObj: err.responseObj,
            })
        }
    }
    protected response<T>(response: ApiResponse<T>): Promise<T> {
		if (response.statusCode === 401) {
			return Promise.reject({
				statusCode: response.statusCode,
				error: "Session is expired, please refresh you page",
			});
		}
		if (response.statusCode >= 200 && response.statusCode < 300) {
			return Promise.resolve(response.responseObj as T);
		}
		if (response.responseObj || response.isBadRequest) {
			return Promise.reject({
				statusCode: response.statusCode,
				error: response.error,
				responseObj: response.responseObj,
				badRequestError:
					response.isBadRequest && response.error
						? Array.isArray(response.error) && response.error.length > 0
							? response.error[0]
							: response.error
						: undefined,
			});
		}
		return Promise.reject(response);
	}
}