from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .serializers import UploadedImageSerializer
from PIL import Image
import pytesseract
from django.http import JsonResponse
from rest_framework.decorators import api_view
import io
import base64
import re

def extract_details(ocr_text):
    details = {}
    
    # Example pattern for extracting dates in the format YYYY-MM-DD
    date_pattern = r'\b\d{4}-\d{2}-\d{2}\b'
    dates = re.findall(date_pattern, ocr_text)
    if dates:
        details['dates'] = dates
    
    # Example pattern for extracting phone numbers (US format)
    phone_pattern = r'\+?(\d{1,4})?(\s|-)?(\(?\d{3}\)?(\s|-)?\d{3}(\s|-)?\d{4})'
    phones = re.findall(phone_pattern, ocr_text)
    if phones:
        details['phones'] = phones
    
    # Example pattern for extracting email addresses
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    emails = re.findall(email_pattern, ocr_text)
    if emails:
        details['emails'] = emails
    
    # Add more patterns as needed for different types of information
    
    return details

# DRF API View for OCR Image Upload
class OCRImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        # Serialize the incoming image
        serializer = UploadedImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            uploaded_file = serializer.instance.image

            # Perform OCR using pytesseract
            try:
                image = Image.open(uploaded_file)
                ocr_text = pytesseract.image_to_string(image)

                # Return the OCR result
                return Response({
                    "message": "OCR Successful",
                    "ocr_text": ocr_text
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({
                    "error": str(e),
                    "message": "Failed to process the image"
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Basic Home Page (non-API endpoint)
def home(request):
    return JsonResponse({"message": "Welcome to the OCR API!"})


# API endpoint for uploading and processing an image
# @api_view(['POST'])
# def upload_image(request):
#     if 'file' not in request.FILES:
#         return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

#     file = request.FILES['file']
#     print(f"Received file: {file.name}")  # Log the filename for debugging

#     try:
#         # Process the image (e.g., perform OCR, resize, etc.)
#         img = Image.open(file)
#         img.thumbnail((800, 800))  # Resize image to a thumbnail

#         # Perform OCR using pytesseract
#         ocr_text = pytesseract.image_to_string(img)

#         # Save the processed image as a byte array
#         img_byte_array = io.BytesIO()
#         img.save(img_byte_array, format='JPEG')
#         img_byte_array.seek(0)

#         # Encode the image as a Base64 string
#         img_base64 = base64.b64encode(img_byte_array.getvalue()).decode('utf-8')

#         # Return the processed image as a Base64 string
#         return Response({
#             'message': 'Image uploaded and processed successfully.',
#             'ocr_text': ocr_text,
#             'image': img_base64  # Sending the image as a Base64 string
#         }, content_type="application/json")

#     except Exception as e:
#         print(f"Error processing image: {e}")  # Log any errors during image processing
#         return Response({
#             "error": str(e),
#             "message": "Failed to process the image"
#         }, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def upload_image(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

    file = request.FILES['file']
    print(f"Received file: {file.name}")  # Log the filename for debugging

    try:
        # Process the image (e.g., perform OCR, resize, etc.)
        img = Image.open(file)
        img.thumbnail((800, 800))  # Resize image to a thumbnail

        # Perform OCR using pytesseract
        ocr_text = pytesseract.image_to_string(img)

        # Extract structured details from the OCR text
        extracted_details = extract_details(ocr_text)

        # Save the processed image as a byte array
        img_byte_array = io.BytesIO()
        img.save(img_byte_array, format='JPEG')
        img_byte_array.seek(0)

        # Encode the image as a Base64 string
        img_base64 = base64.b64encode(img_byte_array.getvalue()).decode('utf-8')

        # Return the processed image, OCR text, and extracted details as a Base64 string
        return Response({
            'message': 'Image uploaded and processed successfully.',
            'ocr_text': ocr_text,  # All extracted text
            'extracted_details': extracted_details,  # Structured details extracted from text
            'image': img_base64  # Sending the image as a Base64 string
        }, content_type="application/json")

    except Exception as e:
        print(f"Error processing image: {e}")  # Log any errors during image processing
        return Response({
            "error": str(e),
            "message": "Failed to process the image"
        }, status=status.HTTP_400_BAD_REQUEST)