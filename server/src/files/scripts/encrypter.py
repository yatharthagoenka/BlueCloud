import os

from cryptography.fernet import Fernet, MultiFernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives.ciphers.aead import (
    AESCCM, AESGCM, ChaCha20Poly1305)

uuid = "0"

def readPlainText(filename, gem) -> bytes:
    source_filename = os.path.join('store/files', filename, gem)
    file = open(source_filename, 'rb')
    raw = b""
    for line in file:
        raw = raw + line
    file.close()
    return raw


def writeEncryptedText(filename, gem, encryptedData: bytes):
    target_filename = os.path.join('store/gems', filename, os.path.basename(gem))
    target_file = open(target_filename, 'wb')
    target_file.write(encryptedData)
    target_file.close()


def writeEncryptedKeys(uuid, encryptedKeys: bytes):
    target_file = open(os.path.join('store/files', uuid, os.path.basename("enc_keys")), "wb")
    target_file.write(encryptedKeys)
    target_file.close()


def rsaKeyPairGeneration():
    private_key = rsa.generate_private_key(
        public_exponent=65537, key_size=2048, backend=default_backend())
    public_key = private_key.public_key()
    return {"private": private_key, "public": public_key}


def RSAAlgo(data: bytes, my_private_key, your_public_key):
    encryptedKeys = my_private_key.encrypt(data)
    encryptedKeys = your_public_key.encrypt(encryptedKeys)
    # All keys stored in store_in_me.enc encrypted with my_private_key as well as your_public_key
    writeEncryptedKeys(encryptedKeys)


# AES in CBC mode with a 128-bit key for encryption; using PKCS7 padding.
def AESAlgo(uuid, data: bytes, key: bytes):
    f = Fernet(key)
    secret_data = f.encrypt(data)
    # All keys stored in store_in_me.enc encrypted with key_1
    writeEncryptedKeys(uuid, secret_data)


def AESAlgoRotated(filename, gem, key1: bytes, key2: bytes):
    f = MultiFernet([Fernet(key1), Fernet(key2)])
    raw = readPlainText(filename, gem)
    encryptedData = f.encrypt(raw)
    writeEncryptedText(filename, gem, encryptedData)


def ChaChaAlgo(filename, gem, key: bytes, nonce: bytes):
    aad = b"authenticated but unencrypted data"
    chacha = ChaCha20Poly1305(key)

    raw = readPlainText(filename, gem)
    encryptedData = chacha.encrypt(nonce, raw, aad)
    writeEncryptedText(filename, gem, encryptedData)


def AESGCMAlgo(filename, gem, key: bytes, nonce: bytes):
    aad = b"authenticated but unencrypted data"
    aesgcm = AESGCM(key)
    raw = readPlainText(filename, gem)
    encryptedData = aesgcm.encrypt(nonce, raw, aad)
    writeEncryptedText(filename, gem , encryptedData)


def AESCCMAlgo(filename, gem, key: bytes, nonce: bytes):
    aad = b"authenticated but unencrypted data"
    aesccm = AESCCM(key)

    raw = readPlainText(filename, gem)
    encryptedData = aesccm.encrypt(nonce, raw, aad)
    writeEncryptedText(filename, gem, encryptedData)


def encrypter(file_uuid):
    uuid = file_uuid
    os.makedirs(os.path.join('store/gems', os.path.basename(uuid)), exist_ok=True)
    key_1 = Fernet.generate_key()
    key_1_1 = Fernet.generate_key()
    key_1_2 = Fernet.generate_key()
    key_2 = ChaCha20Poly1305.generate_key()
    key_3 = AESGCM.generate_key(bit_length=128)
    key_4 = AESCCM.generate_key(bit_length=128)
    nonce13 = os.urandom(13)
    nonce12 = os.urandom(12)
    files = sorted(os.listdir(os.path.join('store/files', os.path.basename(uuid))))
    for index in range(0, len(files)):
        if index % 4 == 0:
            AESAlgoRotated(uuid, f"GEM{index+1}",key_1_1, key_1_2)
        elif index % 4 == 1:
            ChaChaAlgo(uuid, f"GEM{index+1}",key_2, nonce12)
        elif index % 4 == 2:
            AESGCMAlgo(uuid, f"GEM{index+1}",key_3, nonce12)
        else:
            AESCCMAlgo(uuid, f"GEM{index+1}",key_4, nonce13)
    secret_information = (key_1_1)+b":::::"+(key_1_2)+b":::::"+(key_2) + \
        b":::::"+(key_3)+b":::::"+(key_4)+b":::::" + \
        (nonce12)+b":::::"+(nonce13)  # All the keys

    # Encrypting all the keys with algo1 using key_1
    AESAlgo(uuid, secret_information, key_1)
    public_key = open(os.path.join('store/files', uuid, os.path.basename("public_key.pem")), "wb")
    public_key.write(key_1)
    public_key.close()
