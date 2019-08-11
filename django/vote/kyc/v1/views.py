from __future__ import unicode_literals
from django.shortcuts import render
# -*- coding: utf-8 -*-
from . import serializers
from django.shortcuts import get_object_or_404
from otp.models import Otp_session
from kyc.models import KycInfo
from constituency.models import Constituency
from polling_booth.models import PollingBooth
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .services.kyc_verfication_service import Kyc
from common.v1.decorators import meta_data_response, session_authorize, catch_exception
from common.v1.utils.error_wrapper import error_wrapper
# from . import serializers




class GetKycData(APIView):
    """
    View for fectching the kyc details.
    """
# @meta_data_response()
    def get(self, request, uuid):
        # try:
        #     kyc_data = KycInfo.objects.get(uuid= uuid)

        # except:
        #     kyc_data = {result:"the data for particular user does not exist"}  
        
        kyc_data = get_object_or_404(KycInfo, uuid=uuid)
        serializer = serializers.KycInfoSerializer(kyc_data)

        return Response(serializer.data, status=status.HTTP_200_OK)



class AddKycData(APIView):
    """
    View for adding the kyc details from the frontend.
    """
    def post(self, request):

        print (request.data)
        serializer = serializers.KycInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': error_wrapper(serializer.errors)},
                        status=status.HTTP_400_BAD_REQUEST)


class VerifyKycData(APIView):
    """
    View for verifying the kyc details. this will be called by a legitimate verifier. 
    """
    def post(self, request):

        print (request.data)
        print(request.data["uuid"])
        print(request.data["constituency"]) 
        
        try:
            user = KycInfo.objects.get(uuid = request.data["uuid"])
            print(user)
            print(Constituency.objects.all())
            constituency = Constituency.objects.get(name=request.data["constituency"])
            polling_booth = PollingBooth.objects.get(address=request.data["polling_booth"])
            print(polling_booth)
            print(constituency)
            user.constituency = constituency
            user.polling_booth = polling_booth
            user.kyc_done = True
            user.save()
            serializer = serializers.KycInfoSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except :
            return Response({'error': "Can't Process. Please recheck the data again"},
                        status=status.HTTP_400_BAD_REQUEST)
        



# class UserLogin(APIView):
#     """
#     View for UserLogin
#     """
#     # @catch_exception()
#     @meta_data_response()
#     def post(self, request):
#         serializer = serializers.UserLoginSerializer(data=request.data)
#         if serializer.is_valid():
#             session_data = serializer.save()
#             return Response(session_data, status=status.HTTP_200_OK)
#         print(serializer.errors, 100)
#         return Response({'error': error_wrapper(serializer.errors)},
#                         status=status.HTTP_401_UNAUTHORIZED)


# class UserLogout(APIView):
#     """
#     View for User Logout
#     """
#     @meta_data_response()
#     @session_authorize(user_id_key="user_id")
#     def post(self, request, auth_data):
#         if auth_data.get('authorized'):
#             serializer = serializers.UserLogoutSerializer(data=request.data)
#             serializer.logout_user(
#                 user_id=auth_data.get('user_id'),
#                 session_token=auth_data.get('session_token'))
#             return Response({}, status.HTTP_200_OK)
#         return Response({}, status.HTTP_401_UNAUTHORIZED)
