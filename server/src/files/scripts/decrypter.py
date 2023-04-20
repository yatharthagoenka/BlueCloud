import os
from cryptography.fernet import Fernet, MultiFernet
from cryptography.hazmat.primitives.ciphers.aead import (AESCCM, AESGCM, ChaCha20Poly1305)

def readEncryptedKeys(uuid):
    target_file = open(os.path.join('store/files', uuid, "enc_keys.pem"), "rb")
    encryptedKeys = b""
    for line in target_file:
        encryptedKeys = encryptedKeys + line
    target_file.close()
    return encryptedKeys

def readEncryptedText(uuid, gem):
    source_gem = os.path.join('store/gems', uuid, gem)
    file = open(source_gem, 'rb')
    encryptedText = b""
    for line in file:
        encryptedText = encryptedText + line
    file.close()
    return encryptedText

def writePlainText(uuid, gem, plainText):
    target_file = open(os.path.join('store/files', uuid, 'dec', os.path.basename(gem)), 'wb')
    target_file.write(plainText)
    target_file.close()

def AESAlgo(uuid, key):
    f = Fernet(key)
    encryptedKeys = readEncryptedKeys(uuid)
    secret_data = f.decrypt(encryptedKeys)
    return secret_data

def AESAlgoRotated(uuid, gem, key1, key2):
    f = MultiFernet([Fernet(key1), Fernet(key2)])
    encryptedText = readEncryptedText(uuid, gem)
    plainText = f.decrypt(encryptedText)
    writePlainText(uuid, gem, plainText)

def ChaChaAlgo(uuid, gem, key, nonce):
    aad = b"authenticated but unencrypted data"
    chacha = ChaCha20Poly1305(key)
    encryptedText = readEncryptedText(uuid, gem)
    plainText = chacha.decrypt(nonce, encryptedText, aad)
    writePlainText(uuid, gem, plainText)

def AESGCMAlgo(uuid, gem, key, nonce):
    aad = b"authenticated but unencrypted data"
    aesgcm = AESGCM(key)
    encryptedText = readEncryptedText(uuid, gem)
    plainText = aesgcm.decrypt(nonce, encryptedText, aad)
    writePlainText(uuid, gem, plainText)

def AESCCMAlgo(uuid, gem, key, nonce):
    aad = b"authenticated but unencrypted data"
    aesccm = AESCCM(key)
    encryptedText = readEncryptedText(uuid, gem)
    plainText = aesccm.decrypt(nonce, encryptedText, aad)
    writePlainText(uuid, gem, plainText)

def decrypter(uuid, pub_key):
    secret_information = AESAlgo(uuid, pub_key)
    list_information = secret_information.split(b':::::')
    key_1_1 = list_information[0]
    key_1_2 = list_information[1]
    key_2 = list_information[2]
    key_3 = list_information[3]
    key_4 = list_information[4]
    nonce12 = list_information[5]
    nonce13 = list_information[6]
    files = sorted(os.listdir(os.path.join('store/gems', os.path.basename(uuid))))
    for index in range(0, len(files)):
        if index % 4 == 0:
            AESAlgoRotated(uuid, files[index], key_1_1, key_1_2)
        elif index % 4 == 1:
            ChaChaAlgo(uuid, files[index], key_2, nonce12)
        elif index % 4 == 2:
            AESGCMAlgo(uuid, files[index], key_3, nonce12)
        else:
            AESCCMAlgo(uuid, files[index], key_4, nonce13)