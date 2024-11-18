export type ClientProps = {
  id: string;
  name: string;
  phone: string;
  loanAmount: number;
  amountPaid: number;
  startDate: Date;
  initialNumberOfInstallments: number; // Initial number of installments
  numberOfRemainingInstallments: number; // Number of remaining installments
};

export class Client {
  private constructor(private readonly props: ClientProps) {}

  public static create(
    name: string,
    phone: string,
    loanAmount: number,
    startDate: Date,
    initialNumberOfInstallments: number
  ) {
    return new Client({
      id: crypto.randomUUID().toString(),
      name,
      phone,
      loanAmount,
      amountPaid: 0,
      startDate,
      initialNumberOfInstallments,
      numberOfRemainingInstallments: initialNumberOfInstallments,
    });
  }

  public static with(props: ClientProps) {
    return new Client(props);
  }

  //
  public payInstallment(amount: number) {
    if (amount > this.amountRemaining) {
      throw new Error("Amount paid exceeds the remaining amount");
    }
    return new Client({
      ...this.props,
      amountPaid: this.props.amountPaid + amount,
      numberOfRemainingInstallments:
        this.props.numberOfRemainingInstallments - 1,
    });
  }

  // Getters
  public get id() {
    return this.props.id;
  }
  public get name() {
    return this.props.name;
  }
  public get phone() {
    return this.props.phone;
  }
  // Loan amount
  public get loanAmount() {
    return this.props.loanAmount;
  }
  // Amount paid so far
  public get amountPaid() {
    return this.props.amountPaid;
  }

  // Amount remaining to be paid
  public get amountRemaining() {
    return this.props.loanAmount - this.props.amountPaid;
  }

  // Start date of the loan
  public get startDate() {
    return this.props.startDate;
  }
  // Initial number of installments
  public get initialNumberOfInstallments() {
    return this.props.initialNumberOfInstallments;
  }
  // Number of remaining installments
  public get numberOfRemainingInstallments() {
    return this.props.numberOfRemainingInstallments;
  }

  // Number of installments paid
  public get numberOfPayedInstallments() {
    return (
      this.props.initialNumberOfInstallments -
      this.props.numberOfRemainingInstallments
    );
  }
}
