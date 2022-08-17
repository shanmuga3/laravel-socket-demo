<!DOCTYPE html>
<html dir="{{ app()->getLocale() == 'ar' ? 'rtl' : 'ltr'}}" lang="{{ str_replace('_', '-', app()->getLocale()) }}" xmlns:fb="http://ogp.me/ns/fb#">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="theme-color" content="#008276">
        <title> Laravel Chat App </title>
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    </head>
    <body>
        <div class="container-fluid bg-success page main-page">
            <div class="row justify-content-center">
                <div class="col-md-4 login-form">
                    <div class="form-floating">
                        <input type="text" name="user" class="form-control user-name" placeholder="User Name">
                        <label class="form-label"> User Name </label>
                    </div>
                </div>                
            </div>
        </div>
        <div class="container page chat-page d-none">
            <div class="row justify-content-center h-100">
                <div class="col-md-10 h-100">
                    <div class="d-flex flex-column h-100">
                        <div class="flex-shrink-0 messages">
                            
                        </div>
                        <div class="footer mt-auto py-3 bg-light chat-area">
                            <div class="form-group">
                                <input type="text" name="message" id="user-message" class="form-control" placeholder="Type here...">
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>