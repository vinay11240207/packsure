# PaddleOCR Service Stub
# When ready for live OCR inference:
# 1. Install dependencies: pip install paddleocr paddlepaddle
# 2. Initialize: ocr = PaddleOCR(use_angle_cls=True, lang='en')
# 3. Call: result = ocr.ocr(img_path, cls=True)

from typing import List
from models.schemas import OcrResult

async def run_ocr_pipeline(image_bytes: bytes) -> List[OcrResult]:
    """
    Runs text detection & recognition on the package image.
    Returns detected text lines, confidence scores, and bounding box coordinates [x1, y1, x2, y2].
    """
    return []
