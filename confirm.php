<?php
$host     = 'mysql80.ez-tech.sakura.ne.jp'; // データベースサーバー名
$dbname   = 'ez-tech_contact_db';       // データベース名
$user     = 'ez-tech_contact_db';               // データベース ユーザ名
$password = 'AdEkGJw6';       // 接続パスワード

try {
    $dsn = "mysql:host={$host};dbname={$dbname};charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    $name    = $_POST['name']    ?? '';
    $tel     = $_POST['tel']     ?? '';
    $mail    = $_POST['mail']    ?? '';
    $zip     = $_POST['zip']     ?? '';
    $address = ($_POST['pref'] ?? '') . ($_POST['addr'] ?? '');
    $type    = $_POST['type']    ?? '';
    $message = $_POST['message'] ?? '';

    $sql = "INSERT INTO contact_data (name, tel, mail, zip, address, bird_type, message) 
            VALUES (:name, :tel, :mail, :zip, :address, :type, :message)";
    
    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':name'    => $name,
        ':tel'     => $tel,
        ':mail'    => $mail,
        ':zip'     => $zip,
        ':address' => $address,
        ':type'    => $type,
        ':message' => $message
    ]);

    // --- ここから 管理者への通知メール送信 ---

    mb_language("Japanese");
    mb_internal_encoding("UTF-8");

    $to      = "0520index@gmail.com";
    $subject = "【害鳥レスキュー侍】サイトからお問い合わせがありました";
    
    $body = "サイトから新しいお問い合わせがありました。\n\n";
    $body .= "--------------------------------------------------\n";
    $body .= "【お名前】: " . $name . "\n";
    $body .= "【電話番号】: " . $tel . "\n";
    $body .= "【メール】: " . $mail . "\n";
    $body .= "【住所】: " . $address . "\n";
    $body .= "【鳥の種類】: " . $type . "\n";
    $body .= "【内容】: \n" . $message . "\n";
    $body .= "--------------------------------------------------\n";
    $body .= "早めのご対応をお願いします。";

$from_email = "postmaster@rescue-samurai.com"; // お名前.comで取ったドメイン
$header = "From: " . $from_email . "\r\n";
$header .= "Reply-To: " . $mail; // 返信先はお客様のアドレス

    mb_send_mail($to, $subject, $body, $header);
    // --- ここまで ---

    echo "<h1>送信完了</h1>";
    echo "<p>お問い合わせいただきありがとうございます。
担当者よりご連絡いたしますので、少々お待ちいただけますと幸いです。</p>";
    echo "<a href='index.html'>トップページに戻る</a>";

} catch (PDOException $e) {
    exit('エラーが発生しました：' . $e->getMessage());
}
?>